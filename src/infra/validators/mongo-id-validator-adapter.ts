import { MongoIdValidator } from '@/validation/protocols/mongo-id-validator'
import validator from 'validator'

export class MongoIdValidatorAdapter implements MongoIdValidator {
  isMongoId (value: string): boolean {
    return validator.isMongoId(value)
  }
}
