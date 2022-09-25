import { RequiredFieldValidation, TypeofValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { MongoIdValidation } from '@/validation/validators/mongoid-validation'
import { MongoIdValidatorAdapter } from '@/infra/validators/mongo-id-validator-adapter'

export const makeSaveSurveyResultValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['answer']) {
    validations.push(new RequiredFieldValidation(field))
    validations.push(new TypeofValidation(field, 'string'))
  }
  validations.push(new MongoIdValidation('surveyId', new MongoIdValidatorAdapter()))
  return new ValidationComposite(validations)
}
