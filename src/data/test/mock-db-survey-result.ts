import { mockSaveSurveyResultResponse } from '@/domain/test'
import { SaveSurveyResultParams, SaveSurveyResultResponse } from '@/domain/usecases/survey-result/save-survey-result'
import { SaveSurveyResultRepository } from '../protocols/db/survey-result/save-survey-result-repository'

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async saveResult (data: SaveSurveyResultParams): Promise<SaveSurveyResultResponse> {
      return await Promise.resolve(mockSaveSurveyResultResponse())
    }
  }
  return new SaveSurveyResultRepositoryStub()
}
