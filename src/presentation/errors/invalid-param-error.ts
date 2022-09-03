import { ApplicationError } from './application-error'

export class InvalidParamError extends ApplicationError {
  constructor (paramName: string) {
    super(`Invalid param: ${paramName}`, 400)
    this.name = 'InvalidParamError'
  }
}
