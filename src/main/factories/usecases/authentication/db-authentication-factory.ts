import { DbAuthentication } from '@/data/usecases/account/db-authentication'
import { Authentication } from '@/domain/usecases/account/authentication'
import { makeEncrypter } from '../../adapters/cryptograph/encrypt-factory'
import { makeHashComparer } from '../../adapters/cryptograph/hasher-comparer'
import { makeLoadAccountByEmailRepository } from '../../adapters/db/account/db-load-account-by-email-repository-factory'
import { makeUpdateAccessTokenRepository } from '../../adapters/db/account/db-update-access-token-repository-factory'

export const makeDbAuthentication = (): Authentication => {
  return new DbAuthentication(makeLoadAccountByEmailRepository(), makeHashComparer(), makeEncrypter(), makeUpdateAccessTokenRepository())
}
