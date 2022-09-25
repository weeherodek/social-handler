import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '../../presentation/protocols/validation'
import { MongoIdValidator } from '../protocols/mongo-id-validator'

export class MongoIdValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly mongoIdValidator: MongoIdValidator) {

  }

  validate (data: any): string | null {
    if (data[this.fieldName] !== undefined) {
      const isValidJwt = this.mongoIdValidator.isMongoId(data[this.fieldName])
      if (isValidJwt) {
        return null
      }
      return new InvalidParamError(this.fieldName).message
    }
    return null
  }
}
