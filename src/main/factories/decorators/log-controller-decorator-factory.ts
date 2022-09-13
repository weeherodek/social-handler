import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'

import { Controller } from '@/presentation/protocols/controller'
import { makeLogErrorRepository } from '../adapters/db/log/db-log-error-repository-factory'

export const makeLogDecoratorController = (controller: Controller): Controller => {
  return new LogControllerDecorator(controller, makeLogErrorRepository())
}
