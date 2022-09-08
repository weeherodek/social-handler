import { ApplicationError } from './application-error'

export class MissingVariableError extends ApplicationError {
  constructor (variable: string) {
    super(`Missing ${variable} on text`, 400)
  }
}
