import { InvalidParamError } from '@/presentation/errors'
import { EmailValidator } from '@/validation/protocols/email-validator'
import { Validation } from '../../presentation/protocols/validation'

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator) {

  }

  validate (data: any): string | null {
    const isValidEmail = this.emailValidator.isValid(data[this.fieldName])
    if (!isValidEmail) {
      return new InvalidParamError(this.fieldName).message
    }
    return null
  }
}
