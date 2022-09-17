import { StrongPasswordError } from '@/presentation/errors/strong-password-error'
import { Validation } from '@/presentation/protocols/validation'
import { StrongPasswordValidator } from '../protocols/strong-password-validator'

export class StrongPasswordValidation implements Validation {
  constructor (private readonly fieldName: string,
    private readonly strongPasswordValidator: StrongPasswordValidator) {

  }

  validate (data: any): string | null {
    const isStrongPassword = this.strongPasswordValidator.isStrongPassword(data[this.fieldName])
    if (data[this.fieldName] && isStrongPassword) return null
    return new StrongPasswordError().message
  }
}
