import { LogHandlerDecorator } from '@/main/decorators/log-handler-decorator'

import { Controller } from '@/presentation/protocols/controller'
import { Middleware } from '@/presentation/protocols/middleware'
import { makeLogErrorRepository } from '../adapters/db/log/db-log-error-repository-factory'

export const makeLogDecoratorController = (handler: Controller | Middleware): Controller => {
  return new LogHandlerDecorator(handler, makeLogErrorRepository())
}
