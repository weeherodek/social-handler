import { SurveyResultResponseModel } from '@/domain/models/survey-result/survey-result'
import { mockSurveyResultResponseModel } from '@/domain/test'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { LoadByIdSurveyResultRepository } from '../protocols/db/survey-result/load-by-idsurvey-result-repository'
import { SaveSurveyResultRepository } from '../protocols/db/survey-result/save-survey-result-repository'

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async saveResult (data: SaveSurveyResultParams): Promise<SurveyResultResponseModel> {
      return await Promise.resolve(mockSurveyResultResponseModel())
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

export const mockLoadByIdSurveyResultRepository = (): LoadByIdSurveyResultRepository => {
  class LoadByIdSurveyResultRepository implements LoadByIdSurveyResultRepository {
    async loadByIdSurveyResult (surveyId: string): Promise<SurveyResultResponseModel> {
      return await Promise.resolve(mockSurveyResultResponseModel())
    }
  }

  return new LoadByIdSurveyResultRepository()
}
