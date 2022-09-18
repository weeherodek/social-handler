import { SurveyModel } from '@/domain/models/survey/survey'
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys'
import { ok } from '@/presentation/helpers/http/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}
  async handle (httpRequest: HttpRequest<{}>): Promise<HttpResponse<SurveyModel[]>> {
    const surveys = await this.loadSurveys.loadAll()
    return ok(surveys)
  }
}
