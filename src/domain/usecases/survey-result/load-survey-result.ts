import { SurveyResultResponseModel } from '@/domain/models/survey-result/survey-result'

export interface LoadByIdSurveyResult {
  loadResult: (surveyId: string, accountId: string) => Promise<SurveyResultResponseModel | null>
}
