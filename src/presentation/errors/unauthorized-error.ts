import { ApplicationError } from './application-error'

export class UnauthorizedError extends ApplicationError {
  constructor () {
    super('Unauthorized', 401)
    this.name = 'UnauthorizedError'
  }
}
