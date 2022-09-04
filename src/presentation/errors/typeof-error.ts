import { ApplicationError } from './application-error'

export class TypeofError extends ApplicationError {
  constructor (fieldName: string, typeofField: string) {
    super(`Field ${fieldName} must be a ${typeofField}`, 400)
  }
}
