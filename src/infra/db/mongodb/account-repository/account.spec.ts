import env from '@/main/config/env'
import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'

const accountCollection = env.accountCollection

const makeSut = (): AccountMongoRepository => {
  const sut = new AccountMongoRepository(accountCollection)
  return sut
}

let collectionAccounts: Collection
describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
    collectionAccounts = await MongoHelper.getCollection(accountCollection)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await collectionAccounts.deleteMany({})
  })

  describe('add()', () => {
    test('Should return a new account', async () => {
      const sut = makeSut()
      const newAccount = await sut.add({
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      })
      expect(newAccount).toBeDefined()
      expect(newAccount.id).toBeDefined()
      expect(newAccount).not.toHaveProperty('_id')
      expect(newAccount.name).toBe('any_name')
      expect(newAccount.email).toBe('any_email')
      expect(newAccount.password).toBe('any_password')
      expect(newAccount.date).toBeInstanceOf(Date)
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut()
      await collectionAccounts.insertOne({
        name: 'any_name',
        password: 'any_password',
        email: 'any_email',
        date: new Date()
      })
      const newAccount = await sut.loadByEmail('any_email')
      expect(newAccount).toBeDefined()
      expect(newAccount?.id).toBeDefined()
      expect(newAccount).not.toHaveProperty('_id')
      expect(newAccount?.name).toBe('any_name')
      expect(newAccount?.email).toBe('any_email')
      expect(newAccount?.password).toBe('any_password')
      expect(newAccount?.date).toBeInstanceOf(Date)
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const result = await sut.loadByEmail('any_email')
      expect(result).toBeNull()
    })
  })
})
