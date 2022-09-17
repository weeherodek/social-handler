import { InvalidParamError } from '@/presentation/errors'
import { JwtValidator } from '../protocols/jwt-validator'
import { JwtValidation } from './jwt-validation'

const makeJwtValidator = (): JwtValidator => {
  class JwtValidatorStub implements JwtValidator {
    isValid (token: string): boolean {
      return true
    }
  }
  return new JwtValidatorStub()
}

interface sutTypes {
  sut: JwtValidation
  jwtValidatorStub: JwtValidator
}

const makeSut = (): sutTypes => {
  const jwtValidatorStub = makeJwtValidator()
  const sut = new JwtValidation('x-access-token', jwtValidatorStub)
  return {
    sut,
    jwtValidatorStub
  }
}

describe('Jwt Validation', () => {
  test('Should call JwtValidator with correct values', async () => {
    const { sut, jwtValidatorStub } = makeSut()
    const validateSpy = jest.spyOn(jwtValidatorStub, 'isValid')
    sut.validate({ 'x-access-token': 'any_email' })
    expect(validateSpy).toHaveBeenCalledWith('any_email')
  })

  test('Should return InvalidParamError if JwtValidator returns false', async () => {
    const { sut, jwtValidatorStub } = makeSut()
    jest.spyOn(jwtValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ 'x-access-token': 'any_token' })
    expect(error).toBe(new InvalidParamError('x-access-token').message)
  })

  test('Should throw if JwtValidator throws', () => {
    const { sut, jwtValidatorStub } = makeSut()
    jest.spyOn(jwtValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
