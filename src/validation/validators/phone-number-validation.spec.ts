import { InvalidParamError } from '@/presentation/errors'
import { PhoneNumberValidator } from '../protocols/phone-number-validator'

import { mockPhoneNumberValidator } from '../test'
import { PhoneNumberValidation } from './phone-number-validation'

type SutTypes = {
  sut: PhoneNumberValidation
  phoneNumberValidatorStub: PhoneNumberValidator
}

const makeSut = (): SutTypes => {
  const phoneNumberValidatorStub = mockPhoneNumberValidator()
  const sut = new PhoneNumberValidation('phoneNumber', phoneNumberValidatorStub)
  return {
    sut,
    phoneNumberValidatorStub
  }
}

describe('MongoId Validation', () => {
  test('Should call phoneNumberValidator with correct values', async () => {
    const { sut, phoneNumberValidatorStub } = makeSut()
    const validateSpy = jest.spyOn(phoneNumberValidatorStub, 'isPhoneNumber')
    sut.validate({ phoneNumber: 'any_phone_number' })
    expect(validateSpy).toHaveBeenCalledWith('any_phone_number')
  })

  test('Should return InvalidParamError if PhoneNumberValidator returns false', async () => {
    const { sut, phoneNumberValidatorStub } = makeSut()
    jest.spyOn(phoneNumberValidatorStub, 'isPhoneNumber').mockReturnValueOnce(false)
    const error = sut.validate({ phoneNumber: 'any_phone_number' })
    expect(error).toBe(new InvalidParamError('phoneNumber').message)
  })

  test('Should throw if PhoneNumberValidator throws', () => {
    const { sut, phoneNumberValidatorStub } = makeSut()
    jest.spyOn(phoneNumberValidatorStub, 'isPhoneNumber').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })

  test('Should not call PhoneNumberValidator if field not exists', () => {
    const { sut, phoneNumberValidatorStub } = makeSut()
    const spyIsValid = jest.spyOn(phoneNumberValidatorStub, 'isPhoneNumber')
    sut.validate({ not_exists: 'any_id' })
    expect(spyIsValid).not.toHaveBeenCalled()
  })
})
