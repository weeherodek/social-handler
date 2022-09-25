import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { SaveSurveyResult, SaveSurveyResultParams, SaveSurveyResultResponse } from '@/domain/usecases/survey-result/save-survey-result'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (private readonly saveSurveyResultRepository: SaveSurveyResultRepository) {}
  async saveResult (data: SaveSurveyResultParams): Promise<SaveSurveyResultResponse> {
    const surveyResult = await this.saveSurveyResultRepository.saveResult(data)
    return surveyResult
  }
}
