import { AddAccountRepository } from '@/data/protocols/add-account-repository'
import { Cryptograph } from '@/data/protocols/cryptographer'
import { AccountModel } from '@/domain/models/account/account'
import { AddAccount, AddAccountModel } from '@/domain/usecases/account/add-acount'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly cryptograph: Cryptograph,
    private readonly addAccountRepository: AddAccountRepository
  ) {

  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const cryptoPassword = await this.cryptograph.crypto(accountData.password)
    const newAccount = await this.addAccountRepository.add({
      ...accountData,
      password: cryptoPassword
    })
    return newAccount
  }
}
