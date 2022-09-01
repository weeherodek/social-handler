import { AddTemplateRepository } from '@/data/protocols/add-template-repository'
import { TemplateModel } from '@/domain/models/template/template'
import { AddTemplateModel } from '@/domain/usecases/template/add-template'
import { MongoHelper } from '../helpers/mongo-helper'

export class TemplateMongoRepository implements AddTemplateRepository {
  constructor (private readonly templateCollection: string) {}

  async add (template: AddTemplateModel): Promise<TemplateModel> {
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
}
