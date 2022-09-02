import { DbAddTemplate } from '@/data/usecases/template/db-add-template'
import { TemplateMongoRepository } from '@/infra/db/mongodb/template-repositoy/template'
import { SaveTemplateController } from '@/presentation/controllers/template/save-template'
import { Controller } from '@/presentation/protocols/controller'
import env from '../config/env'
import { LogControllerDecorator } from '../decorators/log'

export const makeTemplateController = (): Controller => {
  const addTemplateRepository = new TemplateMongoRepository(env.templateCollection)
  const addTemplate = new DbAddTemplate(addTemplateRepository)
  const saveTemplateController = new SaveTemplateController(addTemplate)
  return new LogControllerDecorator(saveTemplateController)
}
