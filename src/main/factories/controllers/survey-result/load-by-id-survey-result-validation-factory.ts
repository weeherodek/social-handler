import { RequiredFieldValidation, TypeofValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { MongoIdValidatorAdapter } from '@/infra/validators/mongo-id-validator-adapter'
import { MongoIdValidation } from '@/validation/validators/mongoid-validation'

export const makeLoadByIdSurveyResultValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['surveyId']) {
    validations.push(new RequiredFieldValidation(field))
    validations.push(new TypeofValidation(field, 'string'))
    validations.push(new MongoIdValidation(field, new MongoIdValidatorAdapter()))
  }

  return new ValidationComposite(validations)
}
