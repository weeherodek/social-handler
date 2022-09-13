import { UpdateAcessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import env from '../../../../config/env'

export const makeUpdateAccessTokenRepository = (): UpdateAcessTokenRepository => {
  return new AccountMongoRepository(env.accountCollection)
}
