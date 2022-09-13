import { DbAddTemplate } from '@/data/usecases/template/db-add-template'
import { AddTemplate } from '@/domain/usecases/template/add-template'
import { TemplateMongoRepository } from '@/infra/db/mongodb/template/template-mongo-repository'
import env from '../../../config/env'

export const makeAddTemplate = (): AddTemplate => {
  const templateRepository = new TemplateMongoRepository(env.templateCollection)
  return new DbAddTemplate(templateRepository, templateRepository)
}
