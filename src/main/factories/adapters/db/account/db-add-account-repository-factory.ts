import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import env from '../../../../config/env'

export const makeAddAccountRepository = (): AddAccountRepository => {
  return new AccountMongoRepository(env.accountCollection)
}
