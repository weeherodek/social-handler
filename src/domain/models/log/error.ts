import { AddLogErrorModel } from '@/domain/usecases/log/error'

export type LogErrorModel = {
  id: string
  date: Date
} & AddLogErrorModel
