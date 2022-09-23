import { ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { JwtValidatorAdapter } from '@/infra/validators/jwt-validator-adapter'
import { JwtValidation } from '@/validation/validators/'

export const makeAuthMiddlewareValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new JwtValidation('x-access-token', new JwtValidatorAdapter()))
  return new ValidationComposite(validations)
}
