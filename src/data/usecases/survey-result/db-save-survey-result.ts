import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { SurveyResultResponseModel } from '@/domain/models/survey-result/survey-result'
import { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (private readonly saveSurveyResultRepository: SaveSurveyResultRepository) {}
  async saveResult (data: SaveSurveyResultParams): Promise<SurveyResultResponseModel> {
    const surveyResult = await this.saveSurveyResultRepository.saveResult(data)
    return surveyResult
  }
}
