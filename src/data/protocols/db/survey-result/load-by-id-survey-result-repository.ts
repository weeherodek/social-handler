import { SurveyResultResponseModel } from '@/domain/models/survey-result/survey-result'

export interface LoadByIdSurveyResultRepository {
  loadByIdSurveyResult: (id: string) => Promise<SurveyResultResponseModel | null>
}
