import { LogErrorModel } from '@/domain/models/log/error'

export type AddLogErrorModel = Omit<LogErrorModel, 'id' | 'date'>
