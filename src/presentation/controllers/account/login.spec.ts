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

  test('Should throw is EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error('Fake Error')
    })
    const promise = sut.handle(makeFakeRequest())
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })
})
