import { AccountModel } from '@/domain/models/account/account'
import { ObjectId } from 'mongodb'

export type AccountModelMongo = {
  _id: ObjectId
} & Omit<AccountModel, 'id'>
