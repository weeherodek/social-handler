import { InvalidParamError } from '@/presentation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fieldToCompare')
}

describe('Compare Fields Validation', () => {
  test('Should return a Missing Param Error if validations fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'valid_value',
      fieldToCompare: 'invalid_value'
    })
    expect(error).toBe(new InvalidParamError('fieldToCompare').message)
  })

  test('Should return null if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'valid_value',
      fieldToCompare: 'valid_value'
    })
    expect(error).toBe(null)
  })
})
