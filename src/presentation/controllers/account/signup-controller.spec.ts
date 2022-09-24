import { AccountModel } from '@/domain/models/account/account'
import { mockAccountModelWithoutAccessToken, mockAddAccountParams } from '@/domain/test'
import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-acount'
import { Authentication, LoginParams } from '@/domain/usecases/account/authentication'
import { AlreadyExistsError } from '@/presentation/errors/already-exists-error'
import { created } from '@/presentation/helpers/http/http-helper'
import { HttpRequest } from '@/presentation/protocols/http'
import { SignUpController } from './signup-controller'

const mockRequest = (): HttpRequest<AddAccountParams> => ({
  body: mockAddAccountParams()
})

const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: LoginParams): Promise<string> {
      return 'any_token'
    }
  }

  return new AuthenticationStub()
}

const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<Omit<AccountModel, 'accessToken'> | null> {
      return mockAccountModelWithoutAccessToken()
    }
  }
  return new AddAccountStub()
}

type SutTypes = {
  sut: SignUpController
  addAccountStub: AddAccount
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const authenticationStub = mockAuthentication()
  const addAccountStub = mockAddAccount()
  const sut = new SignUpController(addAccountStub, authenticationStub)
  return {
    sut,
    addAccountStub,
    authenticationStub
  }
}

describe('Template Controller', () => {
  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addAccountSpy = jest.spyOn(addAccountStub, 'add')
    const request = mockRequest()

    const { name, email, password } = request.body

    await sut.handle(request)
    expect(addAccountSpy).toHaveBeenCalledWith({ name, email, password })
  })

  test('Should throw Error if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockRejectedValueOnce(new Error('Fake Error'))
    const response = sut.handle(mockRequest())
    await expect(response).rejects.toThrow(new Error('Fake Error'))
  })

  test('Should created if valid data is provided', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(created({
      id: 'any_id',
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
      date: new Date(),
      accessToken: 'any_token'
    }))
  })

  test('Should throw UserAlreadyExists if AddAccount returns null', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockResolvedValueOnce(null)
    const request = mockRequest()
    const response = sut.handle(request)
    await expect(response).rejects.toThrow(new AlreadyExistsError('User', request.body.email))
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const spyAuth = jest.spyOn(authenticationStub, 'auth')
    const request = mockRequest()
    await sut.handle(request)
    expect(spyAuth).toHaveBeenCalledWith({ email: request.body.email, password: request.body.password })
  })

  test('Should throw if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockRejectedValueOnce(new Error('Fake Error'))
    const promise = sut.handle(mockRequest())
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })
})
