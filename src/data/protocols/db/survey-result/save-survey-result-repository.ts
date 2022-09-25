import { SurveyResultModel } from '@/domain/models/survey-result/survey-result'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'

export interface SaveSurveyResultRepository {
  saveResult: (data: SaveSurveyResultParams) => Promise<SurveyResultModel>
}
