import { RequiredFieldValidation, TypeofValidation, ValidationComposite } from '@/validation/validators'
import { ArrayFieldsValidation } from '@/validation/validators/array-fields-validation'
import { Validation } from '@/presentation/protocols/validation'

export const makeAddSurveyValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['question']) {
    validations.push(new RequiredFieldValidation(field))
    validations.push(new TypeofValidation(field, 'string'))
  }
  validations.push(new RequiredFieldValidation('answers'))

  validations.push(new ArrayFieldsValidation('answers', ['answer']))
  return new ValidationComposite(validations)
}
