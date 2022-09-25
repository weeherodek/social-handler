import { RequiredFieldValidation, TypeofValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeSaveSurveyResultValidation } from './save-survey-result-validation-factory'
import { mockMongoIdValidator } from '@/validation/test'
import { MongoIdValidation } from '@/validation/validators/mongoid-validation'

jest.mock('@/validation/validators/validation-composite')

describe('SaveSurveyResultValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSaveSurveyResultValidation()
    const validations: Validation[] = []
    for (const field of ['answer']) {
      validations.push(new RequiredFieldValidation(field))
      validations.push(new TypeofValidation(field, 'string'))
    }
    validations.push(new MongoIdValidation('surveyId', mockMongoIdValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
