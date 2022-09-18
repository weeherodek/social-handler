import { RequiredFieldValidation, TypeofValidation, ValidationComposite } from '@/validation/validators'
import { ArrayFieldsValidation } from '@/validation/validators/array-fields-validation'
import { Validation } from '@/presentation/protocols/validation'
import { makeAddSurveyValidation } from './add-survey-validation-factory'

jest.mock('@/validation/validators/validation-composite')

describe('AddSurveyValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = []
    for (const field of ['question']) {
      validations.push(new RequiredFieldValidation(field))
      validations.push(new TypeofValidation(field, 'string'))
    }
    validations.push(new RequiredFieldValidation('answers'))

    validations.push(new ArrayFieldsValidation('answers', ['answer']))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
