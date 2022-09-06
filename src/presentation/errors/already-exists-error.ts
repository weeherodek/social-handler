import { ApplicationError } from './application-error'

export class AlreadyExistsError extends ApplicationError {
  constructor (entity: string, duplicatedValue: string) {
    super(`${entity} '${duplicatedValue}' already exists`, 400)
    this.name = 'UserAlreadyExists'
  }
}
