import { StrongPasswordValidator } from '@/presentation/protocols/strong-password-validator'
import validator from 'validator'

export class StrongPasswordValidatorAdapter implements StrongPasswordValidator {
  isStrongPassword (password: string): boolean {
    const isStrongPassword = validator.isStrongPassword(password, {
      minLength: 6,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1
    })
    return isStrongPassword
  };
}
