import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import env from '../../../../config/env'

export const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  return new AccountMongoRepository(env.accountCollection)
}
