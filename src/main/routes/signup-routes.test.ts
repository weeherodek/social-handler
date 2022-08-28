import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '../config/app'

describe('Signup Route', () => {
  beforeAll(async () => {
    await MongoHelper.connect('test')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  afterEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should call signup route and return an new account', async () => {
    await request(app)
      .post('/api/signup')
      .expect({ ok: 'ok' })
      .expect(200)
  })
})
