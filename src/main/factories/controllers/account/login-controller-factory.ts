import { LoginController } from '@/presentation/controllers/account/login-controller'

import { Controller } from '@/presentation/protocols/controller'
import { makeLogDecoratorController } from '../../decorators/log-controller-decorator-factory'
import { makeValidatorDecoratorController } from '../../decorators/validator-controller-decorator-factory'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(makeDbAuthentication())
  return makeValidatorDecoratorController(makeLogDecoratorController(loginController), makeLoginValidation())
}
