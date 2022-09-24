import { AddTemplateParams } from '@/domain/usecases/template/add-template'
import env from '@/main/config/env'
import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { TemplateMongoRepository } from './template-mongo-repository'

const templateCollection = env.templateCollection

const makeFakeTemplate = (): AddTemplateParams => ({
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
      const newTemplate = await sut.add(makeFakeTemplate())
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
      await collectionTemplates.insertOne({ ...makeFakeTemplate(), date: new Date() })
      const template = await sut.loadByName('any_name')
      expect(template).toBeDefined()
      expect(template?.id).toBeDefined()
      expect(template).not.toHaveProperty('_id')
      expect(template?.name).toBe('any_name')
      expect(template?.text).toBe('any_text')
      expect(template?.fields.length).toBe(2)
      expect(template?.fields[0]).toEqual({
        name: 'any_field_name',
        required: false,
        defaultValue: ''
      })
      expect(template?.fields[1]).toEqual({
        name: 'any_field_name_2',
        required: true,
        defaultValue: 'any_default_value'
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
