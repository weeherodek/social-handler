import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'

import { Middleware } from '@/presentation/protocols/middleware'
import { makeLogDecoratorHandler } from '../decorators/log-controller-decorator-factory'
import { makeValidatorDecoratorHandler } from '../decorators/validator-controller-decorator-factory'
import { makeLoadAccountByToken } from '../usecases/account/db-load-account-by-token-factory'
import { makeAuthMiddlewareValidation } from './auth-middleware-validation-factory'

export const makeAuthMiddleware = (role?: string): Middleware => {
  const authMiddleware = new AuthMiddleware(makeLoadAccountByToken(), role)
  return makeValidatorDecoratorHandler(makeLogDecoratorHandler(authMiddleware), makeAuthMiddlewareValidation())
}
