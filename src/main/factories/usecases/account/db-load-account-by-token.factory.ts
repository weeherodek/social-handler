import { DbLoadAccountByToken } from '@/data/usecases/account/db-load-account-by-token'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { makeDecrypter } from '../../adapters/cryptograph/decrypt-factory'
import { makeAccountRepository } from '../../adapters/db/account/db-account-repository-factory'

export const makeLoadAccountByToken = (): LoadAccountByToken => {
  const accountRepository = makeAccountRepository()
  return new DbLoadAccountByToken(makeDecrypter(), accountRepository)
}
