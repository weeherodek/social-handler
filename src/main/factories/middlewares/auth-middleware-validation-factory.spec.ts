import { ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeAuthMiddlewareValidation } from './auth-middleware-validation-factory'
import { JwtValidation } from '@/validation/validators/jwt-validation'
import { JwtValidator } from '@/validation/protocols/jwt-validator'

jest.mock('@/validation/validators/validation-composite')

const makeJwtValidator = (): JwtValidator => {
  class JwtValidatorStub implements JwtValidator {
    isValid (token: string): boolean {
      return true
    }
  }
  return new JwtValidatorStub()
}

describe('AuthMiddlewareValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAuthMiddlewareValidation()
    const validations: Validation[] = []
    validations.push(new JwtValidation('x-access-token', makeJwtValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
