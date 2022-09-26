import { PhoneNumberValidator } from '@/validation/protocols/phone-number-validator'
import validator from 'validator'

export class PhoneNumberValidatorAdapter implements PhoneNumberValidator {
  isPhoneNumber (phoneNumber: string): boolean {
    return validator.isMobilePhone(phoneNumber, 'pt-BR', {
      strictMode: true
    })
  }
}
