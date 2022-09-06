import { AccountModel } from '@/domain/models/account/account'
import { AddAccount, AddAccountModel } from '@/domain/usecases/account/add-acount'
import { AlreadyExistsError } from '@/presentation/errors/already-exists-error'
import { created } from '@/presentation/helpers/http/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest } from '@/presentation/protocols/http'
import { SignUpController } from './signup-controller'

jest.useFakeTimers({
  now: new Date('2020-01-01')
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_text',
    email: 'any_email',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountModel): Promise<AccountModel | null> {
      const fakeAccount: AccountModel = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        date: new Date()
      }
      return fakeAccount
    }
  }
  return new AddAccountStub()
}

interface sutTypes {
  sut: Controller
  addAccountStub: AddAccount
}

const makeSut = (): sutTypes => {
  const addAccountStub = makeAddAccount()
  const sut = new SignUpController(addAccountStub)
  return {
    sut,
    addAccountStub
  }
}

describe('Template Controller', () => {
  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addAccountSpy = jest.spyOn(addAccountStub, 'add')
    const httpRequest = makeFakeRequest()

    const { name, email, password } = httpRequest.body

    await sut.handle(httpRequest)
    expect(addAccountSpy).toHaveBeenCalledWith({ name, email, password })
  })

  test('Should throw Error if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      throw new Error()
    })
    const httpRequest = makeFakeRequest()

    const httpResponse = sut.handle(httpRequest)
    await expect(httpResponse).rejects.toThrow(new Error())
  })

  test('Should created if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(created({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      date: new Date()
    }))
  })

  test('Should throw UserAlreadyExists if AddAccount returns null', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockResolvedValueOnce(null)
    const httpRequest = makeFakeRequest()
    const httpResponse = sut.handle(httpRequest)
    await expect(httpResponse).rejects.toThrow(new AlreadyExistsError('User', httpRequest.body.email))
  })
})
