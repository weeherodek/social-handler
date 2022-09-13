import { ApplicationError } from './application-error'

export class StrongPasswordError extends ApplicationError {
  constructor () {
    super('Password must have at least: 6 characters, 1 lower case letter, 1 upper case letter, 1 number and 1 minSymbol', 400)
  }
}
