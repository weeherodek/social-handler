import { DbAuthentication } from '@/data/usecases/account/db-authentication'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { LogMongoRepository } from '@/infra/db/mongodb/log/log-mongo-repository'
import { ValidatorControllerDecorator } from '@/main/decorators/validator-controller-decorator'
import { LoginController } from '@/presentation/controllers/account/login-controller'

import { Controller } from '@/presentation/protocols/controller'
import env from '../../config/env'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeLoginValidation } from './login-validation-factory'

import { BcryptAdapter } from '@/infra/cryptograph/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/cryptograph/jwt-adapter/jwt-adapter'

export const makeLoginController = (): Controller => {
  const encrypter = new JwtAdapter(env.jwtSecret)
  const hashComparer = new BcryptAdapter(env.salt)
  const accountMongoRepository = new AccountMongoRepository(env.accountCollection)
  const authentication = new DbAuthentication(accountMongoRepository, hashComparer, encrypter, accountMongoRepository)
  const loginController = new LoginController(authentication)
  const logMongoRepository = new LogMongoRepository(env.errorLogCollection)
  const logController = new LogControllerDecorator(loginController, logMongoRepository)
  return new ValidatorControllerDecorator(logController, makeLoginValidation())
}
