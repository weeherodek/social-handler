import { AddPhoneNumberAccountRepository } from '@/data/protocols/db/account/add-phone-number-account-repository'
import { mockAddPhoneNumberAccountRepository } from '@/data/test'
import { mockAddPhoneNumberAccountParams } from '@/domain/test'
import { DbAddAccountNumber } from './db-add-account-number'

type SutTypes = {
  addPhoneNumberAccountRepositoryStub: AddPhoneNumberAccountRepository
  sut: DbAddAccountNumber
}

const makeSut = (): SutTypes => {
  const addPhoneNumberAccountRepositoryStub = mockAddPhoneNumberAccountRepository()
  const sut = new DbAddAccountNumber(addPhoneNumberAccountRepositoryStub)
  return {
    sut,
    addPhoneNumberAccountRepositoryStub
  }
}

describe('DbAddAccountNumber Usecase', () => {
  test('Should call AddAccountNumberRepository with correct value', async () => {
    const { sut, addPhoneNumberAccountRepositoryStub } = makeSut()
    const spyAddPhoneNumber = jest.spyOn(addPhoneNumberAccountRepositoryStub, 'addPhoneNumber')
    const params = mockAddPhoneNumberAccountParams()
    await sut.addPhoneNumber(params)
    expect(spyAddPhoneNumber).toHaveBeenCalledWith(params)
  })
})
