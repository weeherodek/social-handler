import { SurveyResultModel } from '@/domain/models/survey-result/survey-result'

export type SaveSurveyResultParams = Omit<SurveyResultModel, 'id' | 'date'>

export interface SaveSurveyResult {
  saveResult: (data: SaveSurveyResultParams) => Promise<SurveyResultModel>
}
