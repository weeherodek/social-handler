import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from './required-field-validation'

describe('Required Field Validation', () => {
  test('Shoudl return a Missing Param Error if validations fails', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({
      not_exists: 'not_exists'
    })
    expect(error).toBe(new MissingParamError('field').message)
  })
})
