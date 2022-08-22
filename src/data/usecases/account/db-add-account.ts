import { Cryptograph } from '@/data/protocols/cryptographer'
import { AccountModel } from '@/domain/models/account/account'
import { AddAccount, AddAccountModel } from '@/domain/usecases/account/add-acount'

export class DbAddAccount implements AddAccount {
  constructor (private readonly cryptograph: Cryptograph) {

  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.cryptograph.crypto(account.password)
    return null as unknown as AccountModel
  }
}
