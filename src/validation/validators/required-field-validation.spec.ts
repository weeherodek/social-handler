import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field')
}

describe('Required Field Validation', () => {
  test('Should return a Missing Param Error if validations fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      not_exists: 'not_exists'
    })
    expect(error).toBe(new MissingParamError('field').message)
  })

  test('Should return null if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value'
    })
    expect(error).toBe(null)
  })
})
