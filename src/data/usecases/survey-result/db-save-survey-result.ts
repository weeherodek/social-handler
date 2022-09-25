import { LoadByIdSurveyResultRepository } from '@/data/protocols/db/survey-result/load-by-id-survey-result-repository'
import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { SurveyResultResponseModel } from '@/domain/models/survey-result/survey-result'
import { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadByIdSurveyResultRepository: LoadByIdSurveyResultRepository) {}

  async saveResult (data: SaveSurveyResultParams): Promise<SurveyResultResponseModel> {
    await this.saveSurveyResultRepository.saveResult(data)
    const surveyResult = await this.loadByIdSurveyResultRepository.loadByIdSurveyResult(data.surveyId) as SurveyResultResponseModel
    return surveyResult
  }
}
