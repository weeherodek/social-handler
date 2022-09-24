import { AddTemplateRepository } from '@/data/protocols/db/template/add-template-repository'
import { LoadTemplateByNameRepository } from '@/data/protocols/db/template/load-template-by-name-repository'
import { TemplateModel } from '@/domain/models/template/template'
import { AddTemplateParams } from '@/domain/usecases/template/add-template'
import { MongoHelper } from '../helpers/mongo-helper'

export class TemplateMongoRepository implements AddTemplateRepository, LoadTemplateByNameRepository {
  constructor (private readonly templateCollection: string) {}

  async add (template: AddTemplateParams): Promise<TemplateModel> {
    const templateCollection = await MongoHelper.getCollection(this.templateCollection)
    const templateData = {
      ...template,
      date: new Date()
    }
    const newTemplate = await templateCollection.insertOne({ ...templateData })
    return {
      id: newTemplate.insertedId.toString(),
      ...templateData
    }
  }

  async loadByName (name: string): Promise<TemplateModel | null> {
    const templateCollection = await MongoHelper.getCollection(this.templateCollection)
    const result = await templateCollection.findOne({ name })
    return await (result && MongoHelper.map(result))
  }
}
