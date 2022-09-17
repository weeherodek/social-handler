import { LoginController } from '@/presentation/controllers/account/login-controller'

import { Controller } from '@/presentation/protocols/controller'
import { makeLogDecoratorHandler } from '../../../decorators/log-controller-decorator-factory'
import { makeValidatorDecoratorHandler } from '../../../decorators/validator-controller-decorator-factory'
import { makeDbAuthentication } from '../../../usecases/account/db-authentication-factory'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(makeDbAuthentication())
  return makeValidatorDecoratorHandler(makeLogDecoratorHandler(loginController), makeLoginValidation())
}
