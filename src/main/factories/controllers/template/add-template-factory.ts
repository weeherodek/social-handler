import { AddTemplateController } from '@/presentation/controllers/template/add-template-controller'
import { Controller } from '@/presentation/protocols/controller'
import { makeLogDecoratorHandler } from '../../decorators/log-controller-decorator-factory'
import { makeValidatorDecoratorHandler } from '../../decorators/validator-controller-decorator-factory'
import { makeAddTemplate } from '../../usecases/template/db-add-template-factory'
import { makeAddTemplateValidation } from './add-template-validation-factory'

export const makeAddTemplateController = (): Controller => {
  const saveTemplateController = new AddTemplateController(makeAddTemplate())
  return makeValidatorDecoratorHandler(makeLogDecoratorHandler(saveTemplateController), makeAddTemplateValidation())
}
