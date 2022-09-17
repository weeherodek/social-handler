import { ApplicationError } from './application-error'

export class ForbiddenError extends ApplicationError {
  constructor () {
    super('Access Denied', 403)
    this.name = 'ForbiddenError'
  }
}
