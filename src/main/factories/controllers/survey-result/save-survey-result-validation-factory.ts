import { RequiredFieldValidation, TypeofValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

export const makeSaveSurveyResultValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['answer']) {
    validations.push(new RequiredFieldValidation(field))
    validations.push(new TypeofValidation(field, 'string'))
  }

  return new ValidationComposite(validations)
}
