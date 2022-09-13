import { StrongPasswordError } from '@/presentation/errors/strong-password-error'
import { StrongPasswordValidator } from '@/presentation/protocols/strong-password-validator'
import { StrongPasswordValidation } from './strong-password-validation'

const makeStrongPasswordValidator = (): StrongPasswordValidator => {
  class StrongPasswordValidatorStub implements StrongPasswordValidator {
    isStrongPassword (password: string): boolean {
      return true
    }
  }
  return new StrongPasswordValidatorStub()
}

interface sutTypes {
  sut: StrongPasswordValidation
  strongPasswordValidatorStub: StrongPasswordValidator

}

const makeSut = (): sutTypes => {
  const strongPasswordValidatorStub = makeStrongPasswordValidator()
  const sut = new StrongPasswordValidation('password', strongPasswordValidatorStub)
  return {
    sut,
    strongPasswordValidatorStub
  }
}

describe('Strong Password Validation', () => {
  test('Should call Strong Password Validator with correct params', () => {
    const { sut, strongPasswordValidatorStub } = makeSut()
    const spyIsStrongPassword = jest.spyOn(strongPasswordValidatorStub, 'isStrongPassword')
    sut.validate({ password: 'any_password' })
    expect(spyIsStrongPassword).toHaveBeenCalledWith('any_password')
  })

  test('Should return StrongPasswordError if validation fails', () => {
    const { sut, strongPasswordValidatorStub } = makeSut()
    jest.spyOn(strongPasswordValidatorStub, 'isStrongPassword').mockReturnValueOnce(false)
    const isStrongPassword = sut.validate({ password: 'any_password' })
    expect(isStrongPassword).toBe(new StrongPasswordError().message)
  })

  test('Should return null if validation succeeds', () => {
    const { sut } = makeSut()
    const isStrongPassword = sut.validate({ password: 'any_password' })
    expect(isStrongPassword).toBeNull()
  })

  test('Should throw  if StrongPasswordValidator throws', () => {
    const { sut, strongPasswordValidatorStub } = makeSut()
    jest.spyOn(strongPasswordValidatorStub, 'isStrongPassword').mockImplementationOnce(() => {
      throw new Error('Fake Error')
    })
    expect(() => sut.validate({ password: 'any_password' })).toThrow(new Error('Fake Error'))
  })
})
