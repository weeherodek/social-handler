import { ApplicationError } from './application-error'

export class InternalServerError extends ApplicationError {
  constructor () {
    super('Internal Server Error', 500)
    this.name = 'InternalServerError'
  }
}
