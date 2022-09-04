import { RequiredFieldValidation, TypeofValidation, ValidationComposite } from '@/presentation/helpers/validators/'
import { ArrayFieldsValidation } from '@/presentation/helpers/validators/array-fields-validation'
import { Validation } from '@/presentation/protocols/validation'
import { makeAddTemplateValidation } from './add-template-validation'

jest.mock('@/presentation/helpers/validators/validation-composite')

describe('AddTemplateValidation Factory', () => {
  test('Should call ValidationComposite  with all validations', () => {
    makeAddTemplateValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'text', 'fields']) {
      validations.push(new RequiredFieldValidation(field))
      validations.push(new TypeofValidation(field, 'string'))
    }
    validations.push(new ArrayFieldsValidation('fields', ['name', 'required']))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
