import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '../../presentation/protocols/validation'
import { PhoneNumberValidator } from '../protocols/phone-number-validator'

export class PhoneNumberValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly phoneNumberValidator: PhoneNumberValidator) {

  }

  validate (data: any): string | null {
    if (data[this.fieldName] !== undefined) {
      const isValidJwt = this.phoneNumberValidator.isPhoneNumber(data[this.fieldName])
      if (isValidJwt) {
        return null
      }
      return new InvalidParamError(this.fieldName).message
    }
    return null
  }
}
