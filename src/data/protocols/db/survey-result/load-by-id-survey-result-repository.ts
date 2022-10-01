import { SurveyResultResponseModel } from '@/domain/models/survey-result/survey-result'

export interface LoadByIdSurveyResultRepository {
  loadByIdSurveyResult: (surveyId: string, accountId: string) => Promise<SurveyResultResponseModel | null>
}
