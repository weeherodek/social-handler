import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { AddPhoneNumberAccountRepository } from '@/data/protocols/db/account/add-phone-number-account-repository'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'
import { UpdateAcessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'
import { AccountModel } from '@/domain/models/account/account'
import { AddPhoneNumberAccountParams } from '@/domain/usecases/account/add-phone-number-account'
import { AddAccountParams } from '@/domain/usecases/account/add-acount'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountModelMongo } from './domain/account-model-mongo'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository,
UpdateAcessTokenRepository, LoadAccountByTokenRepository, AddPhoneNumberAccountRepository {
  constructor (private readonly accountCollection: string) {}

  async add (account: AddAccountParams): Promise<Omit<AccountModel, 'accessToken'>> {
    const accountCollection = await MongoHelper.getCollection<Omit<AccountModel, 'id' | 'accessToken'>>(this.accountCollection)
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
    const accountCollection = await MongoHelper.getCollection<AccountModel>(this.accountCollection)
    const result = await accountCollection.findOne({ email })
    return await (result && MongoHelper.map(result))
  };

  async updateAccessToken (id: string, accessToken: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection<AccountModel>(this.accountCollection)
    await accountCollection.updateOne({
      _id: MongoHelper.mapId(id)
    }, {
      $set: {
        accessToken
      }
    })
  }

  async loadByToken (accessToken: string, role?: string | undefined): Promise<AccountModel | null> {
    const accountCollection = await MongoHelper.getCollection<AccountModel>(this.accountCollection)
    const result = await accountCollection.findOne({
      accessToken,
      $or: [
        {
          role
        }, {
          role: 'admin'
        }]
    })
    return await (result && MongoHelper.map(result))
  }

  async addPhoneNumber (account: AddPhoneNumberAccountParams): Promise<void> {
    const accountCollection = await MongoHelper.getCollection<AccountModelMongo>(this.accountCollection)
    await accountCollection.findOneAndUpdate({
      _id: new ObjectId(account.accountId)
    }, {
      $push: {
        phoneNumbers: {
          number: account.phoneNumber,
          date: new Date()
        }
      }
    })
  }
}
