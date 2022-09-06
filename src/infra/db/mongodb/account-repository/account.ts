import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { AccountModel } from '@/domain/models/account/account'
import { AddAccountModel } from '@/domain/usecases/account/add-acount'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  constructor (private readonly accountCollection: string) {}

  async add (account: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection(this.accountCollection)
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

  async loadByEmail (email: string): Promise<AccountModel | null> {
    const accountCollection = await MongoHelper.getCollection(this.accountCollection)
    const result = await accountCollection.findOne({ email })
    return result && MongoHelper.map(result)
  }
}
