import { LogErrorRepository } from '../protocols/db/log/log-error-repository'

export const mockLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (errorData: { stack: string, params: Record<any, any>, controller: string }): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new LogErrorRepositoryStub()
}
