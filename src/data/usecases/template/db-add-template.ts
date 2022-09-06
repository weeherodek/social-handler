import { AddTemplateRepository } from '@/data/protocols/db/template/add-template-repository'
import { LoadTemplateByNameRepository } from '@/data/protocols/db/template/load-template-by-name-repository'
import { TemplateModel } from '@/domain/models/template/template'
import { AddTemplate, AddTemplateModel } from '@/domain/usecases/template/add-template'

export class DbAddTemplate implements AddTemplate {
  constructor (
    private readonly addTemplateRepository: AddTemplateRepository,
    private readonly loadTemplateByNameRepository: LoadTemplateByNameRepository
  ) {}

  async add (template: AddTemplateModel): Promise<TemplateModel | null> {
    const templateAlreadyExists = await this.loadTemplateByNameRepository.loadByName(template.name)
    if (templateAlreadyExists) return null
    const newTemplate = await this.addTemplateRepository.add(template)
    return newTemplate
  }
}
