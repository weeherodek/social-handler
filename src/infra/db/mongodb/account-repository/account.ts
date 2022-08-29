import { AddAccountRepository } from '@/data/protocols/add-account-repository'
import { AccountModel } from '@/domain/models/account/account'
import { AddAccountModel } from '@/domain/usecases/account/add-acount'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  constructor (private readonly accountCollection: string) {}

  async add (account: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection(this.accountCollection)
    const accountData = {
      date: new Date(),
      ...account
    }
    const newAccount = await accountCollection.insertOne({ ...accountData })
    return {
      id: newAccount.insertedId.toString(),
      ...accountData
    }
  };
}
