import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'
import app from '../config/app'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection
let surveyResultCollection: Collection

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

    test('Should return 200 on save survey result with valid x-access-token', async () => {
      const accessToken = await makeValidAcessToken()
      const insertedSurvey = await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer 1'
        }, {
          answer: 'Answer 2'
        }],
        date: new Date()
      })
      const surveyId = insertedSurvey.insertedId.toString()
      await request(app)
        .put(`/api/surveys/${surveyId}/results`)
        .set('x-access-token', accessToken)
        .send({ answer: 'Answer 1' })
        .expect(200)
    })
  })
})
