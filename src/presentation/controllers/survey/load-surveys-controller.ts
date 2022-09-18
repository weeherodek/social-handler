import { SurveyModel } from '@/domain/models/survey/survey'
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys'
import { noContent, ok } from '@/presentation/helpers/http/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}
  async handle (httpRequest: HttpRequest<{}>): Promise<HttpResponse<SurveyModel[] | null>> {
    const surveys = await this.loadSurveys.loadAll()
    if (!surveys.length) return noContent()
    return ok(surveys)
  }
}
