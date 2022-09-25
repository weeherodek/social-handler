import { LoadByIdSurveyResultRepository } from '@/data/protocols/db/survey-result/load-by-idsurvey-result-repository'
import { SurveyResultResponseModel } from '@/domain/models/survey-result/survey-result'
import { LoadByIdSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'

export class DbLoadByIdSurveyResult implements LoadByIdSurveyResult {
  constructor (private readonly loadByIdSurveyResult: LoadByIdSurveyResultRepository) {}
  async loadResult (id: string): Promise<SurveyResultResponseModel> {
    await this.loadByIdSurveyResult.loadByIdSurveyResult(id)
    return {} as unknown as SurveyResultResponseModel
  }
}
