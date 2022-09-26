import { AddPhoneNumberAccount } from '@/domain/usecases/account/add-phone-number-account'
import { DbAddAccountNumber } from '@/data/usecases/account/db-add-account-number'
import { makeAccountRepository } from '../../adapters/db/account/db-account-repository-factory'

export const makeAddPhoneNumberAccount = (): AddPhoneNumberAccount => {
  return new DbAddAccountNumber(makeAccountRepository())
}
