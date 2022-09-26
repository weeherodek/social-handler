import validator from 'validator'
import { MongoIdValidatorAdapter } from './mongo-id-validator-adapter'
import { MongoIdValidator } from '@/validation/protocols/mongo-id-validator'

jest.mock('validator', () => ({
  isMongoId (): boolean {
    return true
  }
}))

const makeSut = (): MongoIdValidator => {
  return new MongoIdValidatorAdapter()
}

describe('MongoIdValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isMongoId').mockReturnValueOnce(false)
    const isValid = sut.isMongoId('invalid_id')
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isMongoId('invalid_id')
    expect(isValid).toBe(true)
  })

  test('Should call validator with correct id', () => {
    const sut = makeSut()
    const spyIsMongoId = jest.spyOn(validator, 'isMongoId')
    sut.isMongoId('any_id')
    expect(spyIsMongoId).toHaveBeenCalledWith('any_id')
  })
})
