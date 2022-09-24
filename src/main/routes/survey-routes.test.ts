import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'
import app from '../config/app'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection

const makeValidAcessToken = async (): Promise<string> => {
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

  return accessToken
}

describe('Survey Routes', () => {
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

  describe('POST /surveys', () => {
    test('Should return 401 on create survey missing x-access-token', async () => {
      await request(app)
        .post('/api/surveys')
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
        .expect(401)
    })

    test('Should return 204 on create survey with valid token', async () => {
      const accessToken = await makeValidAcessToken()

      await request(app)
        .post('/api/surveys')
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

    test('Should return 403 on create survey with invalid token', async () => {
      await makeValidAcessToken()
      const invalidAccessToken = sign({ id: '123' }, env.jwtSecret)

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', invalidAccessToken)
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

    test('Should return 400 on create survey with broken jwt', async () => {
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', '123')
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
        .expect(400)
    })
  })

  describe('GET /surveys', () => {
    test('Should return 401 on get surveys missing x-access-token', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(401)
    })

    test('Should return 204 with valid x-access-token and if has no surveys', async () => {
      const accessToken = await makeValidAcessToken()
      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(204)
    })

    test('Should return 200 with valid x-access-token and if has surveys', async () => {
      await surveyCollection.insertMany([{
        fake_survey: 'fake_survey'
      }, {
        fake_survey2: 'fake_survey2'
      }])

      const accessToken = await makeValidAcessToken()
      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
