import { mockSaveSurveyResultResponse } from '@/domain/test'
import { SaveSurveyResult, SaveSurveyResultParams, SaveSurveyResultResponse } from '@/domain/usecases/survey-result/save-survey-result'

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async saveResult (data: SaveSurveyResultParams): Promise<SaveSurveyResultResponse> {
      return mockSaveSurveyResultResponse()
    }
  }
  return new SaveSurveyResultStub()
}
