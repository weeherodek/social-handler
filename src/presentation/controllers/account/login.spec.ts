import { Authentication } from '@/domain/usecases/account/authentication'
import { UnauthorizedError } from '@/presentation/errors/unauthorized-error'
import { ok } from '@/presentation/helpers/http-helper'
import { HttpRequest } from '@/presentation/protocols/http'
import { LoginController } from './login'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any_email',
    password: 'any_password'
  }
})

const makeAuthenticationStub = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (email: string, password: string): Promise<string> {
      return 'any_token'
    }
  }

  return new AuthenticationStub()
}

interface sutTypes {
  authenticationStub: Authentication
  sut: LoginController
}

const makeSut = (): sutTypes => {
  const authenticationStub = makeAuthenticationStub()
  const sut = new LoginController(authenticationStub)
  return {
    sut,
    authenticationStub
  }
}

describe('Login Controller', () => {
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const spyAuth = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(makeFakeRequest())
    expect(spyAuth).toHaveBeenCalledWith('any_email', 'any_password')
  })

  test('Should throw UnauthorizedError if auth returns falsy', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockResolvedValueOnce(null)
    const promise = sut.handle(makeFakeRequest())
    await expect(promise).rejects.toThrow(new UnauthorizedError())
  })

  test('Should throw if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockRejectedValueOnce(new Error('Fake Error'))
    const promise = sut.handle(makeFakeRequest())
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })

  test('Should return the acess token', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }))
  })
})
