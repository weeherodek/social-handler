import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '../config/app'
import env from '../config/env'

describe('Template Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  afterEach(async () => {
    const accountCollection = await MongoHelper.getCollection(env.templateCollection)
    await accountCollection.deleteMany({})
  })

  test('Should call template route and return an new template', async () => {
    await request(app)
      .post('/api/template')
      .send({
        name: 'any_name',
        text: 'any text: {{any_field_name_2}}',
        fields: [
          {
            name: 'any_field_name',
            required: false
          },
          {
            name: 'any_field_name_2',
            required: true,
            defaultValue: 'any_default_value'
          }
        ]
      })
      .expect(201)
  })
})
