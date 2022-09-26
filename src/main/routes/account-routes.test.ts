import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'
import app from '../config/app'
import env from '../config/env'

let accountCollection: Collection

const makeValidAcessToken = async (): Promise<string> => {
  const { insertedId } = await accountCollection.insertOne({
    name: 'Philipe',
    email: 'philipe.herodek@email.com.br',
    password: 'any_password'
  })

  const accessToken = sign({ id: insertedId.toString() }, env.jwtSecret)

  await accountCollection.updateOne({ _id: insertedId }, {
    $set: {
      accessToken
    }
  })

  return accessToken
}

describe('Login Routes', () => {
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
          password: 'a1@2B!',
          passwordConfirmation: 'a1@2B!'
        })
        .expect(201)
    })
  })

  describe('POST /login', () => {
    test('Should retun 200 on login', async () => {
      const password = await hash('a1@2B!', 12)

      await accountCollection.insertOne({
        name: 'Philipe Herodek',
        email: 'philipe.herodek@email.com.br',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'philipe.herodek@email.com.br',
          password: 'a1@2B!'
        })
        .expect(200)
    })

    test('Should retun 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'philipe.herodek@email.com.br',
          password: 'a1@2B!'
        })
        .expect(401)
    })
  })

  describe('POST /account/phone-number', () => {
    test('Should return 204 on success', async () => {
      const accessToken = await makeValidAcessToken()
      await request(app)
        .post('/api/account/phone-number')
        .set('x-access-token', accessToken)
        .send({
          phoneNumber: '+5511999990000'
        })
        .expect(204)
    })

    test('Should return 401 on add account phone number without token', async () => {
      await request(app)
        .post('/api/account/phone-number')
        .send({
          phoneNumber: '+5511999990000'
        })
        .expect(401)
    })
  })
})
