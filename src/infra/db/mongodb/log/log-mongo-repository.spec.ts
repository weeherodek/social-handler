import { LogErrorModel } from '@/domain/models/log/error'
import { mockAddLogErrorParams } from '@/domain/test'
import env from '@/main/config/env'
import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { LogMongoRepository } from './log-mongo-repository'

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository(env.errorLogCollection)
}

describe('', () => {
  let errorCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errorsLog')
    await errorCollection.deleteMany({})
  })

  describe('logError()', () => {
    test('Should create an error log on success', async () => {
      const sut = makeSut()
      await sut.logError(mockAddLogErrorParams())
      const logResult = await errorCollection.find<LogErrorModel>({}).toArray()
      expect(logResult.length).toBe(1)
      expect(logResult[0])
      expect(logResult[0].controller).toBe('any_controller')
      expect(logResult[0].params).toEqual({
        any_params: 'any_params_value'
      })
      expect(logResult[0].date).toBeInstanceOf(Date)
    })
  })
})
