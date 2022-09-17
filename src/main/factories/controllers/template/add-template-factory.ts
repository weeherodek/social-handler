import { AddTemplateController } from '@/presentation/controllers/template/add-template-controller'
import { Controller } from '@/presentation/protocols/controller'
import { makeLogDecoratorController } from '../../decorators/log-controller-decorator-factory'
import { makeValidatorDecoratorController } from '../../decorators/validator-controller-decorator-factory'
import { makeAddTemplate } from '../../usecases/add-template/db-add-template-factory'
import { makeAddTemplateValidation } from './add-template-validation-factory'

export const makeAddTemplateController = (): Controller => {
  const saveTemplateController = new AddTemplateController(makeAddTemplate())
  return makeValidatorDecoratorController(makeLogDecoratorController(saveTemplateController), makeAddTemplateValidation())
}
