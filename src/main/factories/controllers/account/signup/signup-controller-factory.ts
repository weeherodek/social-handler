import { SignUpController } from '@/presentation/controllers/account/signup-controller'
import { Controller } from '@/presentation/protocols/controller'
import { makeLogDecoratorController } from '../../../decorators/log-controller-decorator-factory'
import { makeValidatorDecoratorController } from '../../../decorators/validator-controller-decorator-factory'
import { makeAddAccount } from '../../../usecases/add-account/db-add-account-factory'
import { makeDbAuthentication } from '../../../usecases/authentication/db-authentication-factory'
import { makeSignupValidation } from './signup-validation-factory'

export const makeSignupController = (): Controller => {
  const signUpController = new SignUpController(makeAddAccount(), makeDbAuthentication())
  return makeValidatorDecoratorController(makeLogDecoratorController(signUpController), makeSignupValidation())
}
