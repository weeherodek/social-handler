import { DbAddTemplate } from '@/data/usecases/template/db-add-template'
import { AddTemplate } from '@/domain/usecases/template/add-template'
import { makeTemplateRepository } from '../../adapters/db/template/db-template-repository-factory'

export const makeAddTemplate = (): AddTemplate => {
  const templateRepository = makeTemplateRepository()
  return new DbAddTemplate(templateRepository, templateRepository)
}
