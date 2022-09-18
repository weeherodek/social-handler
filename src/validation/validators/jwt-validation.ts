import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '../../presentation/protocols/validation'
import { JwtValidator } from '../protocols/jwt-validator'

export class JwtValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly jwtValidator: JwtValidator) {

  }

  validate (data: any): string | null {
    if (data[this.fieldName] !== undefined) {
      const isValidJwt = this.jwtValidator.isValid(data[this.fieldName])
      if (isValidJwt) {
        return null
      }
      return new InvalidParamError(this.fieldName).message
    }
    return null
  }
}
