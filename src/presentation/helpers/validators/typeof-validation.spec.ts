import { TypeofError } from '@/presentation/errors/typeof-error'
import { TypeofValidation } from './typeof-validation'

const makeSut = (): TypeofValidation => {
  return new TypeofValidation('field', 'string')
}

describe('String Validation', () => {
  test('Should return a TypeOfError if type is not the expected', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 1 })
    expect(error).toBe(new TypeofError('field', 'string').message)
  })

  test('Should return null if validations succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: '1' })
    expect(error).toBe(null)
  })
})
