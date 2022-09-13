import { StrongPasswordError } from '@/presentation/errors/strong-password-error'
import { StrongPasswordValidator } from '@/presentation/protocols/strong-password-validator'
import { Validation } from '@/presentation/protocols/validation'

export class StrongPasswordValidation implements Validation {
  constructor (private readonly fieldName: string,
    private readonly strongPasswordValidator: StrongPasswordValidator) {

  }

  validate (data: any): string | null {
    const isStrongPassword = this.strongPasswordValidator.isStrongPassword(data[this.fieldName])
    if (isStrongPassword) return null
    return new StrongPasswordError().message
  }
}
