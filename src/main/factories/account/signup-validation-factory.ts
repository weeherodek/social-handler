import { EmailValidatorAdapter } from '@/main/adapters/validators/email-validator-adapter'
import { StrongPasswordValidatorAdapter } from '@/main/adapters/validators/strong-password-validator-adapter'
import { CompareFieldsValidation, EmailValidation, RequiredFieldValidation, StrongPasswordValidation, TypeofValidation, ValidationComposite } from '@/presentation/helpers/validators/'
import { Validation } from '@/presentation/protocols/validation'

export const makeSignupValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
    validations.push(new TypeofValidation(field, 'string'))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  validations.push(new StrongPasswordValidation('password', new StrongPasswordValidatorAdapter()))
  return new ValidationComposite(validations)
}
