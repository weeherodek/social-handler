import { JwtValidator } from '@/validation/protocols/jwt-validator'
import validator from 'validator'

export class JwtValidatorAdapter implements JwtValidator {
  isValid (value: string): boolean {
    return validator.isJWT(value)
  }
}
