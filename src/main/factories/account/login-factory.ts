import { LogMongoRepository } from '@/infra/db/mongodb/log/log-mongo-repository'
import { ValidatorControllerDecorator } from '@/main/decorators/validator-controller-decorator'
import { LoginController } from '@/presentation/controllers/account/login-controller'

import { Controller } from '@/presentation/protocols/controller'
import env from '../../config/env'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController()
  const logMongoRepository = new LogMongoRepository(env.errorLogCollection)
  const logController = new LogControllerDecorator(loginController, logMongoRepository)
  return new ValidatorControllerDecorator(logController, makeLoginValidation())
}
