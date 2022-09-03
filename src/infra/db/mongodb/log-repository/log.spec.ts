import { LogErrorModel } from '@/domain/models/log/error'
import { AddLogErrorModel } from '@/domain/usecases/log/error'
import env from '@/main/config/env'
import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { LogMongoRepository } from './log'

const makeFakeErrorLog = (): AddLogErrorModel => ({
  controller: 'fake_controller',
  params: {
    fakeParam: 'fake_param'
  },
  stack: 'fake_error_stack'
})

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

  test('Should create an error log on success', async () => {
    const sut = new LogMongoRepository(env.errorLogCollection)
    await sut.logError(makeFakeErrorLog())
    const logResult = await errorCollection.find<LogErrorModel>({}).toArray()
    expect(logResult.length).toBe(1)
    expect(logResult[0])
    expect(logResult[0].controller).toBe('fake_controller')
    expect(logResult[0].params).toEqual({
      fakeParam: 'fake_param'
    })
    expect(logResult[0].date).toBeInstanceOf(Date)
  })
})
