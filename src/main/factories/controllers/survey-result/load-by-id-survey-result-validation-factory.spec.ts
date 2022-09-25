import { RequiredFieldValidation, TypeofValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeLoadByIdSurveyResultValidation } from './load-by-id-survey-result-validation-factory'

jest.mock('@/validation/validators/validation-composite')

describe('LoadByIdSurveyResultValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoadByIdSurveyResultValidation()
    const validations: Validation[] = []
    for (const field of ['surveyId']) {
      validations.push(new RequiredFieldValidation(field))
      validations.push(new TypeofValidation(field, 'string'))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
