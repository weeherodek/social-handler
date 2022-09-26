import { AccountModel } from '../models/account/account'
import { AddPhoneNumberAccountParams } from '../usecases/account/add-phone-number-account'
import { AddAccountParams } from '../usecases/account/add-acount'
import { LoginParams } from '../usecases/account/authentication'

export const mockAccountModel = (id = 'any_id'): AccountModel => ({
  id,
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  accessToken: 'any_token',
  date: new Date()
})

export const mockAccountModelWithoutAccessToken = (id = 'any_id'): Omit<AccountModel, 'accessToken'> => ({
  id,
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  date: new Date()
})

export const mockAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  password: 'any_password',
  email: 'any_email@mail.com'
})

export const mockLoginParams = (): LoginParams => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockAddPhoneNumberAccountParams = (): AddPhoneNumberAccountParams => ({
  accountId: 'any_account_id',
  phoneNumber: 'any_phone_number'
})
