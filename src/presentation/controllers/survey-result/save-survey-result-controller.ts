import { SurveyResultResponseModel } from '@/domain/models/survey-result/survey-result'
import { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { ForbiddenError } from '@/presentation/errors'
import { ok } from '@/presentation/helpers/http/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest<
  Pick<SaveSurveyResultParams, 'answer'>,
  never,
  Record<'surveyId', string>>): Promise<HttpResponse<SurveyResultResponseModel>> {
    const { surveyId } = httpRequest.params
    const { answer } = httpRequest.body
    const accountId = httpRequest.accountId as string
    const survey = await this.loadSurveyById.loadById(surveyId)
    if (!survey) {
      throw new ForbiddenError()
    }
    const validAnswer = survey.answers.find((srv) => srv.answer === answer)
    if (!validAnswer) {
      throw new ForbiddenError()
    }
    const result = await this.saveSurveyResult.saveResult({
      accountId, answer, surveyId
    })
    return ok(result)
  }
}
