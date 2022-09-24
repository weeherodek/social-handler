import { InvalidParamError } from '@/presentation/errors'
import { JwtValidator } from '../protocols/jwt-validator'
import { mockJwtValidator } from '../test'
import { JwtValidation } from './jwt-validation'

type SutTypes = {
  sut: JwtValidation
  jwtValidatorStub: JwtValidator
}

const makeSut = (): SutTypes => {
  const jwtValidatorStub = mockJwtValidator()
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
    sut.validate({ 'x-access-token': 'any_token' })
    expect(validateSpy).toHaveBeenCalledWith('any_token')
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

  test('Should not call JwtValidator if field not exists', () => {
    const { sut, jwtValidatorStub } = makeSut()
    const spyIsValid = jest.spyOn(jwtValidatorStub, 'isValid')
    sut.validate({ not_exists: 'any_token' })
    expect(spyIsValid).not.toHaveBeenCalled()
  })
})
