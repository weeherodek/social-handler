import { AddPhoneNumberAccount } from '@/domain/usecases/account/add-phone-number-account'
import { noContent } from '@/presentation/helpers/http/http-helper'
import { HttpRequest } from '@/presentation/protocols/http'
import { mockAddPhoneNumberAccount } from '@/presentation/test'
import { AddPhoneNumberAccountController } from './add-phone-number-account-controller'

const mockRequest = (): HttpRequest<Record<'phoneNumber', string>> => ({
  body: {
    phoneNumber: 'any_phone_number'
  },
  accountId: 'any_account_id'
})

type SutTypes = {
  sut: AddPhoneNumberAccountController
  addPhoneNumberAccountStub: AddPhoneNumberAccount
}

const makeSut = (): SutTypes => {
  const addPhoneNumberAccountStub = mockAddPhoneNumberAccount()
  const sut = new AddPhoneNumberAccountController(addPhoneNumberAccountStub)
  return {
    sut,
    addPhoneNumberAccountStub
  }
}

describe('Add Phone Number Account Controller', () => {
  test('Should call AddAccountPhoneNumber with correct values', async () => {
    const { sut, addPhoneNumberAccountStub } = makeSut()
    const spyAddPhoneNumber = jest.spyOn(addPhoneNumberAccountStub, 'addPhoneNumber')
    const request = mockRequest()
    await sut.handle(request)
    expect(spyAddPhoneNumber).toHaveBeenCalledWith({ accountId: request.accountId, phoneNumber: request.body.phoneNumber })
  })

  test('Should return noContent on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(noContent())
  })

  test('Should throw if AddPhoneNumberAccount throws', async () => {
    const { sut, addPhoneNumberAccountStub } = makeSut()
    jest.spyOn(addPhoneNumberAccountStub, 'addPhoneNumber').mockRejectedValueOnce(new Error('Fake Error'))
    const promise = sut.handle(mockRequest())
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })
})
