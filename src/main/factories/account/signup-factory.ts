import { DbAddAccount } from '@/data/usecases/account/db-add-account'
import { BcryptAdapter } from '@/infra/cryptograph/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { LogMongoRepository } from '@/infra/db/mongodb/log/log-mongo-repository'
import { ValidatorControllerDecorator } from '@/main/decorators/validator-controller-decorator'
import { SignUpController } from '@/presentation/controllers/account/signup-controller'
import { Controller } from '@/presentation/protocols/controller'
import env from '../../config/env'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeSignupValidation } from './signup-validation-factory'

export const makeSignupController = (): Controller => {
  const salt = 12
  const cryptograph = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository(env.accountCollection)
  const addAccount = new DbAddAccount(cryptograph, accountMongoRepository, accountMongoRepository)
  const signUpController = new SignUpController(addAccount)
  const logMongoRepository = new LogMongoRepository(env.errorLogCollection)
  const logController = new LogControllerDecorator(signUpController, logMongoRepository)
  return new ValidatorControllerDecorator(logController, makeSignupValidation())
}
