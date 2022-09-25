import { InvalidParamError } from '@/presentation/errors'

import { MongoIdValidator } from '../protocols/mongo-id-validator'
import { mockMongoIdValidator } from '../test'
import { MongoIdValidation } from './mongoid-validation'

type SutTypes = {
  sut: MongoIdValidation
  mongoIdValidatorStub: MongoIdValidator
}

const makeSut = (): SutTypes => {
  const mongoIdValidatorStub = mockMongoIdValidator()
  const sut = new MongoIdValidation('id', mongoIdValidatorStub)
  return {
    sut,
    mongoIdValidatorStub
  }
}

describe('MongoId Validation', () => {
  test('Should call MongoId with correct values', async () => {
    const { sut, mongoIdValidatorStub } = makeSut()
    const validateSpy = jest.spyOn(mongoIdValidatorStub, 'isMongoId')
    sut.validate({ id: 'any_id' })
    expect(validateSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return InvalidParamError if MongoIdValidator returns false', async () => {
    const { sut, mongoIdValidatorStub } = makeSut()
    jest.spyOn(mongoIdValidatorStub, 'isMongoId').mockReturnValueOnce(false)
    const error = sut.validate({ id: 'any_id' })
    expect(error).toBe(new InvalidParamError('id').message)
  })

  test('Should throw if MongoIdValidator throws', () => {
    const { sut, mongoIdValidatorStub } = makeSut()
    jest.spyOn(mongoIdValidatorStub, 'isMongoId').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })

  test('Should not call MongoIdValidator if field not exists', () => {
    const { sut, mongoIdValidatorStub } = makeSut()
    const spyIsValid = jest.spyOn(mongoIdValidatorStub, 'isMongoId')
    sut.validate({ not_exists: 'any_id' })
    expect(spyIsValid).not.toHaveBeenCalled()
  })
})
