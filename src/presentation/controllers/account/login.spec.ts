import { Authentication } from '@/domain/usecases/account/authentication'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { UnauthorizedError } from '@/presentation/errors/unauthorized-error'
import { ok } from '@/presentation/helpers/http-helper'
import { EmailValidator } from '@/presentation/protocols/email-validator'
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

const makeEmailValidatorStub = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}
interface sutTypes {
  authenticationStub: Authentication
  emailValidatorStub: EmailValidator
  sut: LoginController
}

const makeSut = (): sutTypes => {
  const authenticationStub = makeAuthenticationStub()
  const emailValidatorStub = makeEmailValidatorStub()
  const sut = new LoginController(emailValidatorStub, authenticationStub)
  return {
    sut,
    emailValidatorStub,
    authenticationStub
  }
}

describe('Login Controller', () => {
  test('Should throw MissingParamError if no email is provided', async () => {
    const { sut } = makeSut()
    const request = makeFakeRequest()
    delete request.body.email
    const promise = sut.handle(request)
    await expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw MissingParamError if no password is provided', async () => {
    const { sut } = makeSut()
    const request = makeFakeRequest()
    delete request.body.password
    const promise = sut.handle(request)
    await expect(promise).rejects.toThrow(new MissingParamError('password'))
  })

  test('Should call EmailValidator with correct value', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const spyIsValid = jest.spyOn(emailValidatorStub, 'isValid')
    await sut.handle(makeFakeRequest())
    expect(spyIsValid).toHaveBeenCalledWith('any_email')
  })

  test('Should throw InvalidParamError if email is not valid', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const promise = sut.handle(makeFakeRequest())
    await expect(promise).rejects.toThrow(new InvalidParamError('email'))
  })

  test('Should throw if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error('Fake Error')
    })
    const promise = sut.handle(makeFakeRequest())
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })

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
