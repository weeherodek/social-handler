import { SaveSurveyResultParams, SaveSurveyResultResponse } from '@/domain/usecases/survey-result/save-survey-result'

export interface SaveSurveyResultRepository {
  saveResult: (data: SaveSurveyResultParams) => Promise<SaveSurveyResultResponse>
}
