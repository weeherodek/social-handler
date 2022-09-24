import { Validation } from '@/presentation/protocols/validation'
import { EmailValidator } from '../protocols/email-validator'
import { JwtValidator } from '../protocols/jwt-validator'
import { StrongPasswordValidator } from '../protocols/strong-password-validator'

export const mockEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

export const mockJwtValidator = (): JwtValidator => {
  class JwtValidatorStub implements JwtValidator {
    isValid (token: string): boolean {
      return true
    }
  }
  return new JwtValidatorStub()
}

export const mockStrongPasswordValidator = (): StrongPasswordValidator => {
  class StrongPasswordValidatorStub implements StrongPasswordValidator {
    isStrongPassword (password: string): boolean {
      return true
    }
  }
  return new StrongPasswordValidatorStub()
}

export const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (data: any): string | null {
      return null
    }
  }
  return new ValidationStub()
}
