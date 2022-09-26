import { RequiredFieldValidation, TypeofValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { PhoneNumberValidation } from '@/validation/validators/phone-number-validation'
import { PhoneNumberValidatorAdapter } from '@/infra/validators/phone-number-validator-adapter'

export const makeAddPhoneNumberAccountValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['phoneNumber']) {
    validations.push(new RequiredFieldValidation(field))
    validations.push(new TypeofValidation(field, 'string'))
    validations.push(new PhoneNumberValidation(field, new PhoneNumberValidatorAdapter()))
  }
  return new ValidationComposite(validations)
}
