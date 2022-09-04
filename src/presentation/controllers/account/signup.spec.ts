import { AccountModel } from '@/domain/models/account/account'
import { AddAccount, AddAccountModel } from '@/domain/usecases/account/add-acount'
import { ApplicationError } from '@/presentation/errors/'
import { created } from '@/presentation/helpers/http-helper'
import { Validation } from '@/presentation/helpers/validators/validation'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest } from '@/presentation/protocols/http'
import { SignUpController } from './signup'

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

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (data: any): string {
      return ''
    }
  }
  return new ValidationStub()
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountModel): Promise<AccountModel> {
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
  validationStub: Validation
}

const makeSut = (): sutTypes => {
  const addAccountStub = makeAddAccount()
  const validationStub = makeValidation()
  const sut = new SignUpController(addAccountStub, validationStub)
  return {
    sut,
    addAccountStub,
    validationStub
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

  test('Should throw Error if Validation throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
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

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return Status Code 201 if valid data is provided', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce('any_field')
    const promise = sut.handle(makeFakeRequest())
    await expect(promise).rejects.toThrow(new ApplicationError('any_field', 400))
  })
})
