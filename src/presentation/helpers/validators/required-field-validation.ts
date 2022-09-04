import { MissingParamError } from '@/presentation/errors'
import { Validation } from './validation'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {

  }

  validate (data: any): string | null {
    if (data[this.fieldName] === undefined) {
      return new MissingParamError(this.fieldName).message
    }
    return null
  }
}
