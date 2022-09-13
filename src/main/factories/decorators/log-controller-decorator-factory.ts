import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'

import { Controller } from '@/presentation/protocols/controller'
import { makeLogErrorRepository } from '../usecases/log/log-error-factory'

export const makeLogDecoratorController = (controller: Controller): Controller => {
  return new LogControllerDecorator(controller, makeLogErrorRepository())
}
