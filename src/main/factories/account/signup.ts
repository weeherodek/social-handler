import { DbAddAccount } from '@/data/usecases/account/db-add-account'
import { BcryptAdapter } from '@/infra/cryptograph/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '@/infra/db/mongodb/log-repository/log'
import { ValidatorControllerDecorator } from '@/main/decorators/validator'
import { SignUpController } from '@/presentation/controllers/account/signup'
import { Controller } from '@/presentation/protocols/controller'
import env from '../../config/env'
import { LogControllerDecorator } from '../../decorators/log'
import { makeSignupValidation } from './signup-validation'

export const makeSignupController = (): Controller => {
  const salt = 12
  const cryptograph = new BcryptAdapter(salt)
  const addAccountRepository = new AccountMongoRepository(env.accountCollection)
  const addAccount = new DbAddAccount(cryptograph, addAccountRepository)
  const signUpController = new SignUpController(addAccount)
  const logMongoRepository = new LogMongoRepository(env.errorLogCollection)
  const logController = new LogControllerDecorator(signUpController, logMongoRepository)
  return new ValidatorControllerDecorator(logController, makeSignupValidation())
}
