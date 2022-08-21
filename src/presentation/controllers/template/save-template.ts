import { MissingParamError } from '../../errors/'
import { badRequest } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols/'

export class SaveTemplateController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'text']
    for (const field of requiredFields) {
      if (httpRequest.body[field] === undefined) {
        return badRequest(new MissingParamError(field))
      }
    }
    return {
      body: 'ok',
      statusCode: 200
    }
  }
}
