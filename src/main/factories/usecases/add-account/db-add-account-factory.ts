import { DbAddAccount } from '@/data/usecases/account/db-add-account'
import { AddAccount } from '@/domain/usecases/account/add-acount'
import { makeHasher } from '../../adapters/cryptograph/hasher-factory'
import { makeAccountRepository } from '../../adapters/db/account/db-account-repository-factory'

export const makeAddAccount = (): AddAccount => {
  return new DbAddAccount(makeHasher(), makeAccountRepository(), makeAccountRepository())
}
