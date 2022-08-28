import { DbAddAccount } from '@/data/usecases/account/db-add-account'
import { BcryptAdapter } from '@/infra/cryptograph/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account-repository/account'
import { SignUpController } from '@/presentation/controllers/account/signup'
import { EmailValidatorAdapter } from '@/utils/email-validator-adapter'

export const makeSignupController = (): SignUpController => {
  const emailValidator = new EmailValidatorAdapter()
  const salt = 12
  const cryptograph = new BcryptAdapter(salt)
  const addAccountRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(cryptograph, addAccountRepository)
  return new SignUpController(emailValidator, addAccount)
}
