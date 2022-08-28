import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'

const makeSut = (): AccountMongoRepository => {
  const sut = new AccountMongoRepository()
  return sut
}

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const collectionAccounts = MongoHelper.getCollection('accounts')
    await collectionAccounts.deleteMany({})
  })

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
