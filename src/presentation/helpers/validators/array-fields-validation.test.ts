import { MissingParamError } from '@/presentation/errors'
import { TypeofError } from '@/presentation/errors/typeof-error'
import { ArrayFieldsValidation } from './array-fields-validation'

const makeSut = (): ArrayFieldsValidation => {
  return new ArrayFieldsValidation('field', ['requiredFields'])
}

describe('String Validation', () => {
  test('Should return a TypeOfError if type is not the expected', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value'
    })
    expect(error).toBe(new TypeofError('field', 'array').message)
  })

  test('Should return a MissingParamErro if field is not provided', () => {
    const sut = makeSut()
    const error = sut.validate([{
      field: [{
        NOT_EXISTS: 'any_value'
      }]
    }])
    expect(error).toBe(new MissingParamError('field').message)
  })

  test('Should return null if validations succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: [{
        requiredFields: 'any_value'
      }]
    })
    expect(error).toBe(null)
  })
})
