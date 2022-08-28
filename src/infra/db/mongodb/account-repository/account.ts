import { AddAccountRepository } from '@/data/protocols/add-account-repository'
import { AccountModel } from '@/domain/models/account/account'
import { AddAccountModel } from '@/domain/usecases/account/add-acount'
import { MongoHelper } from '../helper/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (account: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const accountData = {
      date: new Date(),
      ...account
    }
    const newAccount = await accountCollection.insertOne(accountData)
    return {
      id: newAccount.insertedId.toString(),
      ...accountData
    }
  };
}
