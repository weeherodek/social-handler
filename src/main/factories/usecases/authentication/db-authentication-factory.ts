import { DbAuthentication } from '@/data/usecases/account/db-authentication'
import { Authentication } from '@/domain/usecases/account/authentication'
import { BcryptAdapter } from '@/infra/cryptograph/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/cryptograph/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import env from '../../../config/env'

export const makeDbAuthentication = (): Authentication => {
  const salt = env.salt
  const hashComparer = new BcryptAdapter(salt)
  const encrypter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository(env.accountCollection)
  return new DbAuthentication(accountMongoRepository, hashComparer, encrypter, accountMongoRepository)
}
