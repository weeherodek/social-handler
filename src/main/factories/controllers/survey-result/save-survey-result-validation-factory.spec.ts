import { RequiredFieldValidation, TypeofValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeSaveSurveyResultValidation } from './save-survey-result-validation-factory'

jest.mock('@/validation/validators/validation-composite')

describe('AddTemplateValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSaveSurveyResultValidation()
    const validations: Validation[] = []
    for (const field of ['answer']) {
      validations.push(new RequiredFieldValidation(field))
      validations.push(new TypeofValidation(field, 'string'))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
