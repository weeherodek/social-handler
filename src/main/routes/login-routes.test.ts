import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '../config/app'
import env from '../config/env'

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  afterEach(async () => {
    const accountCollection = await MongoHelper.getCollection(env.accountCollection)
    await accountCollection.deleteMany({})
  })
  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Philipe Herodek',
          email: 'philipe.herodek@email.com.br',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(201)
    })
  })
})
