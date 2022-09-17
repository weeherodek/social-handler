import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import env from '../../../../config/env'

export const makeAccountRepository = (): AccountMongoRepository => {
  return new AccountMongoRepository(env.accountCollection)
}
