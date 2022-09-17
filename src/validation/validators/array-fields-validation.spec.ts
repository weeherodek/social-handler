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

  test('Should return a MissingParamError if field is not provided', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: [{
        NOT_EXISTS: 'any_value'
      }]
    })
    expect(error).toBe(new MissingParamError('field[0].requiredFields').message)
  })

  test('Should return all the cases not found on each iteration on array if field is not provided', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: [{
        NOT_EXISTS: 'any_value'
      }, {
        NOT_EXISTS: 'any_value'
      }]
    })
    expect(error).toBe(new MissingParamError('field[0].requiredFields').message + ', ' + new MissingParamError('field[1].requiredFields').message)
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
