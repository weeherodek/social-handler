import { AddTemplateRepository } from '@/data/protocols/add-template-repository'
import { TemplateModel } from '@/domain/models/template/template'
import { AddTemplate, AddTemplateModel } from '@/domain/usecases/template/add-template'

export class DbAddTemplate implements AddTemplate {
  constructor (private readonly addTemplateRepository: AddTemplateRepository) {}

  async add (template: AddTemplateModel): Promise<TemplateModel> {
    const newTemplate = await this.addTemplateRepository.add(template)
    return newTemplate
  }
}
