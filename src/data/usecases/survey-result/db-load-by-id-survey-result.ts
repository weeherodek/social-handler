import { LoadByIdSurveyResultRepository } from '@/data/protocols/db/survey-result/load-by-id-survey-result-repository'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { SurveyResultResponseModel } from '@/domain/models/survey-result/survey-result'
import { LoadByIdSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'

export class DbLoadByIdSurveyResult implements LoadByIdSurveyResult {
  constructor (
    private readonly loadByIdSurveyResult: LoadByIdSurveyResultRepository,
    private readonly loadSurveyById: LoadSurveyByIdRepository
  ) {}

  async loadResult (surveyId: string, accountId: string): Promise<SurveyResultResponseModel | null> {
    const surveyResult = await this.loadByIdSurveyResult.loadByIdSurveyResult(surveyId, accountId)
    if (surveyResult) return surveyResult
    const survey = await this.loadSurveyById.loadById(surveyId)
    if (survey) {
      return {
        surveyId,
        date: survey.date,
        question: survey.question,
        answers: survey.answers.map(({ answer, image }) => ({
          answer,
          image,
          count: 0,
          percent: 0,
          isCurrentAnswer: false
        }))
      }
    }
    return null
  }
}
