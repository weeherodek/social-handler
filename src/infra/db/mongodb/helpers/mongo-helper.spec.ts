import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb connection has disconnected', async () => {
    let accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeDefined()
    await sut.disconnect()
    accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeDefined()
  })
})
