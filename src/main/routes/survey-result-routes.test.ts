import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import request from 'supertest'
import app from '../config/app'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection
let surveyResultCollection: Collection

describe('Survey Result Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
    surveyCollection = await MongoHelper.getCollection(env.surveyCollection)
    accountCollection = await MongoHelper.getCollection(env.accountCollection)
    surveyResultCollection = await MongoHelper.getCollection(env.surveyResultCollection)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  afterEach(async () => {
    await surveyCollection.deleteMany({})
    await accountCollection.deleteMany({})
    await surveyResultCollection.deleteMany({})
  })

  describe('PUT /surveys/:surveyId/results', () => {
    test('Should return 401 on save survey result missing x-access-token', async () => {
      await request(app)
        .put('/api/surveys/123/results')
        .send({ answer: 'Answer 1' })
        .expect(401)
    })
  })
})
