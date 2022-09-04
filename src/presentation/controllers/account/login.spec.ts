import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { EmailValidator } from '@/presentation/protocols/email-validator'
import { HttpRequest } from '@/presentation/protocols/http'
import { LoginController } from './login'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any_email',
    password: 'any_password'
  }
})

const makeEmailValidatorStub = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}
interface sutTypes {
  emailValidatorStub: EmailValidator
  sut: LoginController
}

const makeSut = (): sutTypes => {
  const emailValidatorStub = makeEmailValidatorStub()
  const sut = new LoginController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('Login Controller', () => {
  test('Should throw MissingParamError if no email is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.handle({
      body: {
        password: 'any_password'
      }
    })
    await expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw MissingParamError if no password is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.handle({
      body: {
        email: 'any_email'
      }
    })
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
})
