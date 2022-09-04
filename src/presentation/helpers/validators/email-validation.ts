import { InvalidParamError } from '@/presentation/errors'
import { EmailValidator } from '@/presentation/protocols/email-validator'
import { Validation } from './validation'

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
