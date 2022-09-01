import { MongoHelper } from '../helpers/mongo-helper'
import { TemplateMongoRepository } from './template'

const templateCollection = 'templates'

const makeSut = (): TemplateMongoRepository => {
  const sut = new TemplateMongoRepository(templateCollection)
  return sut
}

describe('Template Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const collectionAccounts = await MongoHelper.getCollection(templateCollection)
    await collectionAccounts.deleteMany({})
  })

  test('Should return a new account', async () => {
    const sut = makeSut()
    const newTemplate = await sut.add({
      name: 'any_name',
      text: 'any_text',
      fields: [
        {
          name: 'any_field_name',
          required: false,
          defaultValue: ''
        },
        {
          name: 'any_field_name_2',
          required: true,
          defaultValue: 'any_default_value'
        }
      ]
    })
    expect(newTemplate).toBeDefined()
    expect(newTemplate.id).toBeDefined()
    expect(newTemplate).not.toHaveProperty('_id')
    expect(newTemplate.name).toBe('any_name')
    expect(newTemplate.text).toBe('any_text')
    expect(newTemplate.fields.length).toBe(2)
    expect(newTemplate.date).toBeInstanceOf(Date)
  })
})
