import { AddAccountModel } from '@/domain/usecases/account/add-acount'

export type AccountModel = {
  id: string
  accessToken?: string
  date: Date
} & AddAccountModel
