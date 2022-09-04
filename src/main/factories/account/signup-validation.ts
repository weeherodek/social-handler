import { CompareFieldsValidation } from '@/presentation/helpers/validators/compare-fields-validation'
import { EmailValidation } from '@/presentation/helpers/validators/email-validation'
import { RequiredFieldValidation } from '@/presentation/helpers/validators/required-field-validation'
import { TypeofValidation } from '@/presentation/helpers/validators/typeof-validation'
import { Validation } from '@/presentation/helpers/validators/validation'
import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite'
import { EmailValidatorAdapter } from '@/utils/email-validator-adapter'

export const makeSignupValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
    validations.push(new TypeofValidation(field, 'string'))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
