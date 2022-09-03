import { DbAddAccount } from '@/data/usecases/account/db-add-account'
import { BcryptAdapter } from '@/infra/cryptograph/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '@/infra/db/mongodb/log-repository/log'
import { SignUpController } from '@/presentation/controllers/account/signup'
import { Controller } from '@/presentation/protocols/controller'
import { EmailValidatorAdapter } from '@/utils/email-validator-adapter'
import env from '../config/env'
import { LogControllerDecorator } from '../decorators/log'

export const makeSignupController = (): Controller => {
  const emailValidator = new EmailValidatorAdapter()
  const salt = 12
  const cryptograph = new BcryptAdapter(salt)
  const addAccountRepository = new AccountMongoRepository(env.accountCollection)
  const addAccount = new DbAddAccount(cryptograph, addAccountRepository)
  const signUpController = new SignUpController(emailValidator, addAccount)
  const logMongoRepository = new LogMongoRepository(env.errorLogCollection)
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
