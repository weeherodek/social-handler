import { DbAddAccount } from '@/data/usecases/account/db-add-account'
import { AddAccount } from '@/domain/usecases/account/add-acount'
import { makeHasher } from '../../adapters/cryptograph/hasher-factory'
import { makeAddAccountRepository } from '../../adapters/db/account/db-add-account-repository-factory'
import { makeLoadAccountByEmailRepository } from '../../adapters/db/account/db-load-account-by-email-repository-factory'

export const makeAddAccount = (): AddAccount => {
  return new DbAddAccount(makeHasher(), makeAddAccountRepository(), makeLoadAccountByEmailRepository())
}
