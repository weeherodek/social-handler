import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import request from 'supertest'
import app from '../config/app'
import env from '../config/env'

describe('Login Routes', () => {
  let accountCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
    accountCollection = await MongoHelper.getCollection(env.accountCollection)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  afterEach(async () => {
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

  describe('POST /login', () => {
    test('Should retun 200 on login', async () => {
      const password = await hash('123', 12)

      await accountCollection.insertOne({
        name: 'Philipe Herodek',
        email: 'philipe.herodek@email.com.br',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'philipe.herodek@email.com.br',
          password: '123'
        })
        .expect(200)
    })

    test('Should retun 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'philipe.herodek@email.com.br',
          password: '123'
        })
        .expect(401)
    })
  })
})
