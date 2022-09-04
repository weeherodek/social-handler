import { MissingParamError } from '@/presentation/errors'
import { TypeofError } from '@/presentation/errors/typeof-error'
import { Validation } from '../../protocols/validation'

export class ArrayFieldsValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly requiredFields: string[]) {

  }

  validate (data: any): string | null {
    if (!Array.isArray(data[this.fieldName])) {
      return new TypeofError(this.fieldName, 'array').message
    }
    Array(data[this.fieldName]).forEach((dataArray) => {
      for (const field of this.requiredFields) {
        if (dataArray[field] === undefined) {
          return new MissingParamError(dataArray[field]).message
        }
      }
    })
    return null
  }
}
