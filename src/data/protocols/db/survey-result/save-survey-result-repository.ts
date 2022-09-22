import { SurveyResultModel } from '@/domain/models/survey-result/survey-result'
import { SaveSurveyResultModel } from '@/domain/usecases/survey-result/save-survey-result'

export interface SaveSurveyResultRepository {
  saveResult: (data: SaveSurveyResultModel) => Promise<SurveyResultModel>
}
