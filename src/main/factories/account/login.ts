import { LogMongoRepository } from '@/infra/db/mongodb/log-repository/log'
import { ValidatorControllerDecorator } from '@/main/decorators/validator'
import { LoginController } from '@/presentation/controllers/account/login'

import { Controller } from '@/presentation/protocols/controller'
import env from '../../config/env'
import { LogControllerDecorator } from '../../decorators/log'
import { makeLoginValidation } from './login-validation'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController()
  const logMongoRepository = new LogMongoRepository(env.errorLogCollection)
  const logController = new LogControllerDecorator(loginController, logMongoRepository)
  return new ValidatorControllerDecorator(logController, makeLoginValidation())
}
