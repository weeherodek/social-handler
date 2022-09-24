import { CompareFieldsValidation, EmailValidation, RequiredFieldValidation, TypeofValidation, ValidationComposite, StrongPasswordValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeSignupValidation } from './signup-validation-factory'
import { mockEmailValidator, mockStrongPasswordValidator } from '@/validation/test'

jest.mock('@/validation/validators/validation-composite')

describe('SignupValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignupValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
      validations.push(new TypeofValidation(field, 'string'))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', mockEmailValidator()))
    validations.push(new StrongPasswordValidation('password', mockStrongPasswordValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
