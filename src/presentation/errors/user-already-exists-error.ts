import { ApplicationError } from './application-error'

export class UserAlreadyExistsError extends ApplicationError {
  constructor (email: string) {
    super(`User ${email} already exists`, 400)
    this.name = 'UserAlreadyExists'
  }
}
