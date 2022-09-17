import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { Validation } from '../../presentation/protocols/validation'
import { ValidationComposite } from './validation-composite'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (data: any): string | null {
      return null
    }
  }
  return new ValidationStub()
}

interface sutTypes {
  validationStubs: Validation[]
  sut: ValidationComposite
}

const makeSut = (): sutTypes => {
  const validationStubs = [makeValidation(), makeValidation()]
  const sut = new ValidationComposite(validationStubs)
  return {
    sut,
    validationStubs
  }
}

describe('Validation Composite', () => {
  test('Should returns the errors found in the composite', () => {
    const { sut, validationStubs: validationStub } = makeSut()
    jest.spyOn(validationStub[0], 'validate').mockReturnValueOnce(new Error('Error Message').message)
    const error = sut.validate({ field: 'any_field' })
    expect(error).toBe(new Error('Error Message').message)
  })

  test('Should return the error found in the composite second index', () => {
    const { sut, validationStubs: validationStub } = makeSut()
    jest.spyOn(validationStub[1], 'validate').mockReturnValueOnce(new InvalidParamError('Error Message').message)
    const error = sut.validate({ field: 'any_field' })
    expect(error).toBe(new InvalidParamError('Error Message').message)
  })

  test('Should return the error found in the composite second index', () => {
    const { sut, validationStubs: validationStub } = makeSut()

    jest.spyOn(validationStub[0], 'validate').mockReturnValueOnce(new MissingParamError('Error Message').message)
    jest.spyOn(validationStub[1], 'validate').mockReturnValueOnce(new InvalidParamError('Error Message').message)
    const error = sut.validate({ field: 'any_field' })
    expect(error).toBe([new MissingParamError('Error Message').message, new InvalidParamError('Error Message').message].join(', '))
  })

  test('Should return null if composite succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_field' })
    expect(error).toBe('')
  })
})
