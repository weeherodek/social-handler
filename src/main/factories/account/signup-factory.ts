import { DbAddAccount } from '@/data/usecases/account/db-add-account'
import { DbAuthentication } from '@/data/usecases/account/db-authentication'
import { BcryptAdapter } from '@/infra/cryptograph/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/cryptograph/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { LogMongoRepository } from '@/infra/db/mongodb/log/log-mongo-repository'
import { ValidatorControllerDecorator } from '@/main/decorators/validator-controller-decorator'
import { SignUpController } from '@/presentation/controllers/account/signup-controller'
import { Controller } from '@/presentation/protocols/controller'
import env from '../../config/env'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeSignupValidation } from './signup-validation-factory'

export const makeSignupController = (): Controller => {
  const salt = env.salt
  const cryptograph = new BcryptAdapter(salt)
  const hashComparer = new BcryptAdapter(salt)
  const encrypter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository(env.accountCollection)
  const addAccount = new DbAddAccount(cryptograph, accountMongoRepository, accountMongoRepository)
  const authentication = new DbAuthentication(accountMongoRepository, hashComparer, encrypter, accountMongoRepository)
  const signUpController = new SignUpController(addAccount, authentication)
  const logMongoRepository = new LogMongoRepository(env.errorLogCollection)
  const logController = new LogControllerDecorator(signUpController, logMongoRepository)
  return new ValidatorControllerDecorator(logController, makeSignupValidation())
}
