import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { Hasher } from '@/data/protocols/cryptograph/hasher'
import { AccountModel } from '@/domain/models/account/account'
import { AddAccount, AddAccountModel } from '@/domain/usecases/account/add-acount'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly cryptograph: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {

  }

  async add (accountData: AddAccountModel): Promise<AccountModel | null> {
    const alreadyHasAccount = await this.loadAccountByEmailRepository.load(accountData.email)
    if (alreadyHasAccount) return null
    const cryptoPassword = await this.cryptograph.hash(accountData.password)
    const newAccount = await this.addAccountRepository.add({
      ...accountData,
      password: cryptoPassword
    })
    return newAccount
  }
}
