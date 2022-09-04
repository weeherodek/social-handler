import { RequiredFieldValidation, TypeofValidation, ValidationComposite } from '@/presentation/helpers/validators/'
import { ArrayFieldsValidation } from '@/presentation/helpers/validators/array-fields-validation'
import { Validation } from '@/presentation/protocols/validation'

export const makeAddTemplateValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'text', 'fields']) {
    validations.push(new RequiredFieldValidation(field))
    validations.push(new TypeofValidation(field, 'string'))
  }
  validations.push(new ArrayFieldsValidation('fields', ['name', 'required']))
  return new ValidationComposite(validations)
}
