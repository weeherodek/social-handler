import validator from 'validator'
import { PhoneNumberValidator } from '@/validation/protocols/phone-number-validator'
import { PhoneNumberValidatorAdapter } from './phone-number-validator-adapter'

jest.mock('validator', () => ({
  isMobilePhone (): boolean {
    return true
  }
}))

const makeSut = (): PhoneNumberValidator => {
  return new PhoneNumberValidatorAdapter()
}

describe('PhoneNumberValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isMobilePhone').mockReturnValueOnce(false)
    const isValid = sut.isPhoneNumber('invalid_phone_number')
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isPhoneNumber('valid_phone_number')
    expect(isValid).toBe(true)
  })

  test('Should call validator with correct value', () => {
    const sut = makeSut()
    const spyIsMobilePhone = jest.spyOn(validator, 'isMobilePhone')
    sut.isPhoneNumber('any_phone_number')
    expect(spyIsMobilePhone).toHaveBeenCalledWith('any_phone_number', 'pt-BR', {
      strictMode: true
    })
  })
})
