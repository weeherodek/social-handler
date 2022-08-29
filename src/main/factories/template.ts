import { DbAddTemplate } from '@/data/usecases/template/db-add-template'
import { TemplateMongoRepository } from '@/infra/db/mongodb/template-repositoy/template'
import { SaveTemplateController } from '@/presentation/controllers/template/save-template'
import env from '../config/env'

export const makeTemplateController = (): SaveTemplateController => {
  const addTemplateRepository = new TemplateMongoRepository(env.templateCollection)
  const addTemplate = new DbAddTemplate(addTemplateRepository)
  return new SaveTemplateController(addTemplate)
}
