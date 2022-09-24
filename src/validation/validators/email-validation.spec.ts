import { InvalidParamError } from '@/presentation/errors'
import { EmailValidator } from '@/validation/protocols/email-validator'
import { mockEmailValidator } from '../test'
import { EmailValidation } from './email-validation'

type SutTypes = {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = mockEmailValidator()
  const sut = new EmailValidation('email', emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('Email Validation', () => {
  test('Should call EmailValidator with correct values', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const validateSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.validate({ email: 'any_email' })
    expect(validateSpy).toHaveBeenCalledWith('any_email')
  })

  test('Should return InvalidParamError if EmailValidator returns false', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ email: 'any_email' })
    expect(error).toBe(new InvalidParamError('email').message)
  })

  test('Should throw if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
