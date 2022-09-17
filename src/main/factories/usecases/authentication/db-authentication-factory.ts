import { DbAuthentication } from '@/data/usecases/account/db-authentication'
import { Authentication } from '@/domain/usecases/account/authentication'
import { makeEncrypter } from '../../adapters/cryptograph/encrypt-factory'
import { makeHashComparer } from '../../adapters/cryptograph/hasher-comparer'
import { makeAccountRepository } from '../../adapters/db/account/db-account-repository-factory'

export const makeDbAuthentication = (): Authentication => {
  return new DbAuthentication(makeAccountRepository(), makeHashComparer(), makeEncrypter(), makeAccountRepository())
}
