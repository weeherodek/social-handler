import { SurveyResultResponseModel } from '@/domain/models/survey-result/survey-result'

export interface LoadByIdSurveyResult {
  loadResult: (id: string) => Promise<SurveyResultResponseModel | null>
}
