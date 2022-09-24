import { mockLoginParams } from '@/domain/test'
import { Authentication, LoginParams } from '@/domain/usecases/account/authentication'
import { UnauthorizedError } from '@/presentation/errors/unauthorized-error'
import { ok } from '@/presentation/helpers/http/http-helper'
import { HttpRequest } from '@/presentation/protocols/http'
import { mockAuthentication } from '@/presentation/test'
import { LoginController } from './login-controller'

const mockRequest = (): HttpRequest<LoginParams> => ({
  body: mockLoginParams()
})

type SutTypes = {
  authenticationStub: Authentication
  sut: LoginController
}

const makeSut = (): SutTypes => {
  const authenticationStub = mockAuthentication()
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
    const request = mockRequest()
    await sut.handle(request)
    expect(spyAuth).toHaveBeenCalledWith({ email: request.body.email, password: request.body.password })
  })

  test('Should throw UnauthorizedError if auth returns falsy', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockResolvedValueOnce(null)
    const promise = sut.handle(mockRequest())
    await expect(promise).rejects.toThrow(new UnauthorizedError())
  })

  test('Should throw if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockRejectedValueOnce(new Error('Fake Error'))
    const promise = sut.handle(mockRequest())
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })

  test('Should return the access token', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(ok({ accessToken: 'any_token' }))
  })
})
