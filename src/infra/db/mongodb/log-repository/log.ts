import { LogErrorRepository } from '@/data/protocols'
import { AddLogErrorModel } from '@/domain/usecases/log/error'
import { MongoHelper } from '../helpers/mongo-helper'

export class LogMongoRepository implements LogErrorRepository {
  constructor (private readonly errorsLogCollection: string) {}
  async logError (errorData: AddLogErrorModel): Promise<void> {
    const errorsLogCollection = await MongoHelper.getCollection(this.errorsLogCollection)
    await errorsLogCollection.insertOne({ ...errorData, date: new Date() })
  }
}
