import { ApplicationError } from './application-error'

export class MissingParamError extends ApplicationError {
  constructor (paramName: string) {
    super(`Missing param: ${paramName}`, 400)
    this.name = 'MissingParamError'
  }
}
