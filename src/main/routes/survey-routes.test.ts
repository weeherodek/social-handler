import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'
import app from '../config/app'
import env from '../config/env'

describe('Survey Routes', () => {
  let surveyCollection: Collection
  let accountCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
    surveyCollection = await MongoHelper.getCollection(env.surveyCollection)
    accountCollection = await MongoHelper.getCollection(env.accountCollection)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  afterEach(async () => {
    await surveyCollection.deleteMany({})
    await accountCollection.deleteMany({})
  })

  describe('POST /survey', () => {
    test('Should return 403 on create survey', async () => {
      await request(app)
        .post('/api/survey')
        .send({
          question: 'any_question',
          answers: [{
            answer: 'Answer 1',
            image: 'any_image'
          },
          {
            answer: 'Answer 2'
          }
          ]
        })
        .expect(403)
    })

    test('Should return 204 on create survey with valid token', async () => {
      const { insertedId } = await accountCollection.insertOne({
        name: 'Philipe',
        email: 'philipe.herodek@email.com.br',
        password: 'any_password',
        role: 'admin'
      })

      const accessToken = sign({ id: insertedId.toString() }, env.jwtSecret)

      await accountCollection.updateOne({ _id: insertedId }, {
        $set: {
          accessToken
        }
      })

      await request(app)
        .post('/api/survey')
        .set('x-access-token', accessToken)
        .send({
          question: 'any_question',
          answers: [{
            answer: 'Answer 1',
            image: 'any_image'
          },
          {
            answer: 'Answer 2'
          }
          ]
        })
        .expect(204)
    })
  })
})
