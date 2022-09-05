import { TypeofError } from '@/presentation/errors/typeof-error'
import { Validation } from '../../protocols/validation'

export class TypeofValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly fieldType: string) {}
  validate (data: any): string | null {
    if (data[this.fieldName] && !(typeof data[this.fieldName] === this.fieldType)) {
      return new TypeofError(this.fieldName, this.fieldType).message
    }
    return null
  }
}
