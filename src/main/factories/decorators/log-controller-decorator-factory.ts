import { LogHandlerDecorator } from '@/main/decorators/log-handler-decorator'

import { Controller } from '@/presentation/protocols/controller'
import { Middleware } from '@/presentation/protocols/middleware'
import { makeLogErrorRepository } from '../adapters/db/log/db-log-error-repository-factory'

export const makeLogDecoratorHandler = (handler: Controller | Middleware): Controller | Middleware => {
  return new LogHandlerDecorator(handler, makeLogErrorRepository())
}
