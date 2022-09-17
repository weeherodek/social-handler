import { makeAddAccount } from '@/main/factories/usecases/account/db-add-account-factory'
import { SignUpController } from '@/presentation/controllers/account/signup-controller'
import { Controller } from '@/presentation/protocols/controller'
import { makeLogDecoratorHandler } from '../../../decorators/log-controller-decorator-factory'
import { makeValidatorDecoratorHandler } from '../../../decorators/validator-controller-decorator-factory'
import { makeDbAuthentication } from '../../../usecases/account/db-authentication-factory'
import { makeSignupValidation } from './signup-validation-factory'

export const makeSignupController = (): Controller => {
  const signUpController = new SignUpController(makeAddAccount(), makeDbAuthentication())
  return makeValidatorDecoratorHandler(makeLogDecoratorHandler(signUpController), makeSignupValidation())
}
