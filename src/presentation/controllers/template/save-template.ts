import { TemplateModel } from '@/domain/models/template/template'
import { AddTemplate } from '@/domain/usecases/template/add-template'
import { MissingParamError } from '../../errors/'
import { badRequest, internalServerError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols/'

export class SaveTemplateController implements Controller {
  constructor (private readonly addTemplate: AddTemplate) {

  }

  handle (httpRequest: HttpRequest): HttpResponse<TemplateModel | Error> {
    try {
      const requiredFields = ['name', 'text', 'fields']
      for (const field of requiredFields) {
        if (httpRequest.body[field] === undefined) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, text, fields } = httpRequest.body
      const newTemplate = this.addTemplate.add({
        name, text, fields
      })
      return {
        body: newTemplate,
        statusCode: 200
      }
    } catch (error) {
      return internalServerError()
    }
  }
}
