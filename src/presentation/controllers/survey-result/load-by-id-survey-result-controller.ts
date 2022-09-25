import { SurveyResultResponseModel } from '@/domain/models/survey-result/survey-result'
import { LoadByIdSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { ForbiddenError } from '@/presentation/errors'
import { ok } from '@/presentation/helpers/http/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class LoadByIdSurveyResultController implements Controller {
  constructor (private readonly loadByIdSurveyResult: LoadByIdSurveyResult) {}
  async handle (httpRequest: HttpRequest<any, never, Record<'surveyId', string>>): Promise<HttpResponse<SurveyResultResponseModel>> {
    const surveyResult = await this.loadByIdSurveyResult.loadResult(httpRequest.params.surveyId)
    if (!surveyResult) throw new ForbiddenError()
    return ok(surveyResult)
  }
}
