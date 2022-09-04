import { DbAddTemplate } from '@/data/usecases/template/db-add-template'
import { LogMongoRepository } from '@/infra/db/mongodb/log-repository/log'
import { TemplateMongoRepository } from '@/infra/db/mongodb/template-repositoy/template'
import { ValidatorControllerDecorator } from '@/main/decorators/validator'
import { AddTemplateController } from '@/presentation/controllers/template/save-template'
import { Controller } from '@/presentation/protocols/controller'
import env from '../../config/env'
import { LogControllerDecorator } from '../../decorators/log'
import { makeAddTemplateValidation } from './add-template-validation'

export const makeAddTemplateController = (): Controller => {
  const addTemplateRepository = new TemplateMongoRepository(env.templateCollection)
  const addTemplate = new DbAddTemplate(addTemplateRepository)
  const saveTemplateController = new AddTemplateController(addTemplate)
  const logMongoRepository = new LogMongoRepository(env.errorLogCollection)
  const logControllerDecorator = new LogControllerDecorator(saveTemplateController, logMongoRepository)
  return new ValidatorControllerDecorator(logControllerDecorator, makeAddTemplateValidation())
}
