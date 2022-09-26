import { RequiredFieldValidation, TypeofValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeAddPhoneNumberAccountValidation } from './add-phone-number-account-validation-factory'

jest.mock('@/validation/validators/validation-composite')

describe('AddPhoneNumberAccountValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddPhoneNumberAccountValidation()
    const validations: Validation[] = []
    for (const field of ['phoneNumber']) {
      validations.push(new RequiredFieldValidation(field))
      validations.push(new TypeofValidation(field, 'string'))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
