import { RequiredFieldValidation, TypeofValidation, ValidationComposite } from '@/validation/validators'
import { ArrayFieldsValidation } from '@/validation/validators/array-fields-validation'
import { TextVariablesValidation } from '@/validation/validators/text-variables-validation'
import { Validation } from '@/presentation/protocols/validation'
import { makeAddTemplateValidation } from './add-template-validation-factory'

jest.mock('@/validation/validators/validation-composite')

describe('AddTemplateValidation Factory', () => {
  test('Should call ValidationComposite  with all validations', () => {
    makeAddTemplateValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'text']) {
      validations.push(new RequiredFieldValidation(field))
      validations.push(new TypeofValidation(field, 'string'))
    }
    validations.push(new RequiredFieldValidation('fields'))

    validations.push(new ArrayFieldsValidation('fields', ['name', 'required']))
    validations.push(new TextVariablesValidation('text', 'fields'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
