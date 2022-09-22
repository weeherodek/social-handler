import { SurveyResultModel } from '@/domain/models/survey-result/survey-result'

export type SaveSurveyResultModel = Omit<SurveyResultModel, 'id' | 'date'>

export interface SaveSurveyResult {
  saveResult: (data: SaveSurveyResultModel) => Promise<SurveyResultModel>
}
