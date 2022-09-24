import { mockAddTemplateParams } from '@/domain/test'
import env from '@/main/config/env'
import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { TemplateMongoRepository } from './template-mongo-repository'

const templateCollection = env.templateCollection

const makeSut = (): TemplateMongoRepository => {
  const sut = new TemplateMongoRepository(templateCollection)
  return sut
}

let collectionTemplates: Collection
describe('Template Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
    collectionTemplates = await MongoHelper.getCollection(templateCollection)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await collectionTemplates.deleteMany({})
  })

  describe('add()', () => {
    test('Should return a new template', async () => {
      const sut = makeSut()
      const newTemplate = await sut.add(mockAddTemplateParams())
      expect(newTemplate).toBeDefined()
      expect(newTemplate.id).toBeDefined()
      expect(newTemplate).not.toHaveProperty('_id')
      expect(newTemplate.name).toBe('any_name')
      expect(newTemplate.text).toBe('any_text')
      expect(newTemplate.fields.length).toBe(2)
      expect(newTemplate.date).toBeInstanceOf(Date)
    })
  })

  describe('loadByName()', () => {
    test('Should return an template on success', async () => {
      const sut = makeSut()
      await collectionTemplates.insertOne({ ...mockAddTemplateParams(), date: new Date() })
      const template = await sut.loadByName('any_name')
      expect(template).toBeDefined()
      expect(template?.id).toBeDefined()
      expect(template).not.toHaveProperty('_id')
      expect(template?.name).toBe('any_name')
      expect(template?.text).toBe('any_text')
      expect(template?.fields.length).toBe(2)
      expect(template?.fields[0]).toEqual({
        name: 'any_name_1',
        required: true,
        defaultValue: 'default_value_1'
      })
      expect(template?.fields[1]).toEqual({
        name: 'any_name_2',
        required: false,
        defaultValue: 'default_value_2'
      })
      expect(template?.date).toBeInstanceOf(Date)
    })

    test('Should return null if loadByName fails', async () => {
      const sut = makeSut()
      const result = await sut.loadByName('any_name')
      expect(result).toBeNull()
    })
  })
})
