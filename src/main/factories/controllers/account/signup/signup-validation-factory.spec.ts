import { CompareFieldsValidation, EmailValidation, RequiredFieldValidation, TypeofValidation, ValidationComposite, StrongPasswordValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { EmailValidator } from '@/validation/protocols/email-validator'
import { makeSignupValidation } from './signup-validation-factory'
import { StrongPasswordValidator } from '@/validation/protocols/strong-password-validator'

jest.mock('@/validation/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeStrongPasswordValidator = (): StrongPasswordValidator => {
  class StrongPasswordValidatorStub implements StrongPasswordValidator {
    isStrongPassword (password: string): boolean {
      return true
    }
  }
  return new StrongPasswordValidatorStub()
}

describe('SignupValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignupValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
      validations.push(new TypeofValidation(field, 'string'))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    validations.push(new StrongPasswordValidation('password', makeStrongPasswordValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
