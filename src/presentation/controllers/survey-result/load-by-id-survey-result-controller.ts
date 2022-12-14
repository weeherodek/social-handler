import { SurveyResultResponseModel } from '@/domain/models/survey-result/survey-result'
import { LoadByIdSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { ForbiddenError } from '@/presentation/errors'
import { ok } from '@/presentation/helpers/http/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class LoadByIdSurveyResultController implements Controller {
  constructor (private readonly loadByIdSurveyResult: LoadByIdSurveyResult) {}
  async handle (httpRequest: HttpRequest<{}, never, Record<'surveyId', string>>): Promise<HttpResponse<SurveyResultResponseModel>> {
    const accountId = httpRequest.accountId as string
    const surveyResult = await this.loadByIdSurveyResult.loadResult(httpRequest.params.surveyId, accountId)
    if (!surveyResult) throw new ForbiddenError()
    return ok(surveyResult)
  }
}
