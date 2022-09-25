import { SurveyResultResponseModel } from '@/domain/models/survey-result/survey-result'
import { mockSurveyResultResponseModel } from '@/domain/test'
import { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async saveResult (data: SaveSurveyResultParams): Promise<SurveyResultResponseModel> {
      return mockSurveyResultResponseModel()
    }
  }
  return new SaveSurveyResultStub()
}
