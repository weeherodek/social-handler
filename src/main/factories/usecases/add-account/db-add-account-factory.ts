import { DbAddAccount } from '@/data/usecases/account/db-add-account'
import { AddAccount } from '@/domain/usecases/account/add-acount'
import { BcryptAdapter } from '@/infra/cryptograph/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import env from '../../../config/env'

export const makeAddAccount = (): AddAccount => {
  const salt = env.salt
  const cryptograph = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository(env.accountCollection)
  return new DbAddAccount(cryptograph, accountMongoRepository, accountMongoRepository)
}
