import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { Hasher } from '@/data/protocols/cryptograph/hasher'
import { AccountModel } from '@/domain/models/account/account'
import { AddAccount, AddAccountModel } from '@/domain/usecases/account/add-acount'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly cryptograph: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {

  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const cryptoPassword = await this.cryptograph.hash(accountData.password)
    const newAccount = await this.addAccountRepository.add({
      ...accountData,
      password: cryptoPassword
    })
    return newAccount
  }
}
