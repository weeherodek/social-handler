import { mockAddAccountParams } from '@/domain/test'
import env from '@/main/config/env'
import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'

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
      const newAccount = await sut.add(mockAddAccountParams())
      expect(newAccount).toBeDefined()
      expect(newAccount.id).toBeDefined()
      expect(newAccount).not.toHaveProperty('_id')
      expect(newAccount.name).toBe('any_name')
      expect(newAccount.email).toBe('any_email@mail.com')
      expect(newAccount.password).toBe('any_password')
      expect(newAccount.date).toBeInstanceOf(Date)
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut()
      await collectionAccounts.insertOne({
        ...mockAddAccountParams(),
        date: new Date()
      })
      const newAccount = await sut.loadByEmail('any_email@mail.com')
      expect(newAccount).toBeDefined()
      expect(newAccount?.id).toBeDefined()
      expect(newAccount).not.toHaveProperty('_id')
      expect(newAccount?.name).toBe('any_name')
      expect(newAccount?.email).toBe('any_email@mail.com')
      expect(newAccount?.password).toBe('any_password')
      expect(newAccount?.date).toBeInstanceOf(Date)
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const result = await sut.loadByEmail('any_email@mail.com')
      expect(result).toBeNull()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on updateAccessToken success', async () => {
      const sut = makeSut()
      const res = await collectionAccounts.insertOne({
        ...mockAddAccountParams(),
        date: new Date()
      })
      const _id = res.insertedId
      const accountWithoutAccessToken = await collectionAccounts.findOne({ _id })

      expect(accountWithoutAccessToken).toBeDefined()
      expect(accountWithoutAccessToken?.accessToken).toBeUndefined()

      await sut.updateAccessToken(_id.toString(), 'any_token')
      const accountWithAccessToken = await collectionAccounts.findOne({ _id })

      expect(accountWithAccessToken).toBeDefined()
      expect(accountWithAccessToken?.accessToken).toBe('any_token')
    })
  })

  describe('loadByAccessToken()', () => {
    test('Should return an account on success without role', async () => {
      const sut = makeSut()
      await collectionAccounts.insertOne({
        ...mockAddAccountParams(),
        accessToken: 'any_token',
        date: new Date()
      })
      const account = await sut.loadByToken('any_token')
      expect(account).toBeDefined()
      expect(account?.id).toBeDefined()
      expect(account).not.toHaveProperty('_id')
      expect(account?.name).toBe('any_name')
      expect(account?.email).toBe('any_email@mail.com')
      expect(account?.password).toBe('any_password')
      expect(account?.accessToken).toBe('any_token')
      expect(account?.date).toBeInstanceOf(Date)
    })

    test('Should return an account loadByToken with admin role', async () => {
      const sut = makeSut()
      await collectionAccounts.insertOne({
        ...mockAddAccountParams(),
        accessToken: 'any_token',
        role: 'admin',
        date: new Date()
      })
      const account = await sut.loadByToken('any_token', 'admin')
      expect(account).toBeDefined()
      expect(account?.id).toBeDefined()
      expect(account).not.toHaveProperty('_id')
      expect(account?.name).toBe('any_name')
      expect(account?.email).toBe('any_email@mail.com')
      expect(account?.password).toBe('any_password')
      expect(account?.accessToken).toBe('any_token')
      expect(account?.date).toBeInstanceOf(Date)
    })

    test('Should return an account on loadByToken if user is admin and dont have accessToken', async () => {
      const sut = makeSut()
      await collectionAccounts.insertOne({
        ...mockAddAccountParams(),
        accessToken: 'any_token',
        role: 'admin',
        date: new Date()
      })
      const account = await sut.loadByToken('any_token')
      expect(account).toBeDefined()
      expect(account?.id).toBeDefined()
      expect(account).not.toHaveProperty('_id')
      expect(account?.name).toBe('any_name')
      expect(account?.email).toBe('any_email@mail.com')
      expect(account?.password).toBe('any_password')
      expect(account?.accessToken).toBe('any_token')
      expect(account?.date).toBeInstanceOf(Date)
    })

    test('Should return null if loadByToken fails', async () => {
      const sut = makeSut()
      const result = await sut.loadByToken('any_token')
      expect(result).toBeNull()
    })
  })
})
