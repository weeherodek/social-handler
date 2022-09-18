import { AddSurvey, AddSurveyModel } from '@/domain/usecases/survey/add-survey'
import { noContent } from '@/presentation/helpers/http/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class AddSurveyController implements Controller {
  constructor (private readonly addSurvey: AddSurvey) {}

  async handle (httpRequest: HttpRequest<AddSurveyModel>): Promise<HttpResponse<null>> {
    const { answers, question } = httpRequest.body
    await this.addSurvey.add({ answers, question })
    return noContent()
  }
}
