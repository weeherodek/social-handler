import { AddLogErrorModel } from '@/domain/usecases/log/error'

export interface LogErrorRepository {
  logError: (errorData: AddLogErrorModel) => Promise<void>
}
