import { AccountModel } from '@/domain/models/account/account'

export interface AddAccount {
  add: (account: AddAccountParams) => Promise<Omit<AccountModel, 'accessToken'> | null>
}

export type AddAccountParams = Omit< AccountModel, 'id' | 'date' | 'accessToken'>
