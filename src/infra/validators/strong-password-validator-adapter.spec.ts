import { StrongPasswordValidatorAdapter } from './strong-password-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isStrongPassword: () => true
}))

const makeSut = (): StrongPasswordValidatorAdapter => {
  return new StrongPasswordValidatorAdapter()
}

describe('Strong Password Validator Adapter', () => {
  test('Should return false if is not a strong password', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isStrongPassword').mockImplementationOnce(() => false)
    const isStrongPassword = sut.isStrongPassword('any_password')
    expect(isStrongPassword).toBe(false)
  })

  test('Should call with correct params', () => {
    const sut = makeSut()
    const spyIsStrong = jest.spyOn(validator, 'isStrongPassword')
    sut.isStrongPassword('any_password')
    expect(spyIsStrong).toHaveBeenCalledWith('any_password', {
      minLength: 6,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1
    })
  })

  test('Should return true if is a strong password', () => {
    const sut = makeSut()
    const isStrongPassword = sut.isStrongPassword('any_password')
    expect(isStrongPassword).toBe(true)
  })
})
