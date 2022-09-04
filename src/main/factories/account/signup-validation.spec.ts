import { CompareFieldsValidation, EmailValidation, RequiredFieldValidation, TypeofValidation, ValidationComposite } from '@/presentation/helpers/validators/'
import { Validation } from '@/presentation/protocols/validation'
import { EmailValidator } from '@/presentation/protocols/email-validator'
import { makeSignupValidation } from './signup-validation'

jest.mock('@/presentation/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignupValidation Factory', () => {
  test('Should call ValidationComposite  with all validations', () => {
    makeSignupValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
      validations.push(new TypeofValidation(field, 'string'))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
