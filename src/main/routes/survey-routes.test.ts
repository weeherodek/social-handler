import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import request from 'supertest'
import app from '../config/app'
import env from '../config/env'

describe('Login Routes', () => {
  let surveyCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
    surveyCollection = await MongoHelper.getCollection(env.surveyCollection)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  afterEach(async () => {
    await surveyCollection.deleteMany({})
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
  })
})
