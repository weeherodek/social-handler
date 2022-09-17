import { RequiredFieldValidation, TypeofValidation, ValidationComposite } from '@/validation/validators'
import { ArrayFieldsValidation } from '@/validation/validators/array-fields-validation'
import { TextVariablesValidation } from '@/validation/validators/text-variables-validation'
import { Validation } from '@/presentation/protocols/validation'

export const makeAddTemplateValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'text']) {
    validations.push(new RequiredFieldValidation(field))
    validations.push(new TypeofValidation(field, 'string'))
  }
  validations.push(new RequiredFieldValidation('fields'))
  validations.push(new ArrayFieldsValidation('fields', ['name', 'required']))
  validations.push(new TextVariablesValidation('text', 'fields'))
  return new ValidationComposite(validations)
}
