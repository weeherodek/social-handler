import { DbAddTemplate } from '@/data/usecases/template/db-add-template'
import { LogMongoRepository } from '@/infra/db/mongodb/log/log-mongo-repository'
import { TemplateMongoRepository } from '@/infra/db/mongodb/template/template-mongo-repository'
import { ValidatorControllerDecorator } from '@/main/decorators/validator-controller-decorator'
import { AddTemplateController } from '@/presentation/controllers/template/save-template-controller'
import { Controller } from '@/presentation/protocols/controller'
import env from '../../config/env'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeAddTemplateValidation } from './add-template-validation-factory'

export const makeAddTemplateController = (): Controller => {
  const templateRepository = new TemplateMongoRepository(env.templateCollection)
  const addTemplate = new DbAddTemplate(templateRepository, templateRepository)
  const saveTemplateController = new AddTemplateController(addTemplate)
  const logMongoRepository = new LogMongoRepository(env.errorLogCollection)
  const logControllerDecorator = new LogControllerDecorator(saveTemplateController, logMongoRepository)
  return new ValidatorControllerDecorator(logControllerDecorator, makeAddTemplateValidation())
}
