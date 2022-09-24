import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'
import { AddLogErrorParams } from '@/domain/usecases/log/error'
import { MongoHelper } from '../helpers/mongo-helper'

export class LogMongoRepository implements LogErrorRepository {
  constructor (private readonly errorsLogCollection: string) {}
  async logError (errorData: AddLogErrorParams): Promise<void> {
    const errorsLogCollection = await MongoHelper.getCollection(this.errorsLogCollection)
    await errorsLogCollection.insertOne({ ...errorData, date: new Date() })
  }
}
