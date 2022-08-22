import { TemplateModel } from '@/domain/models/template/template'
import { AddTemplate } from '@/domain/usecases/template/add-template'
import { MissingParamError } from '../../errors/'
import { badRequest, created, internalServerError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols/'

export class SaveTemplateController implements Controller {
  constructor (private readonly addTemplate: AddTemplate) {

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<TemplateModel | Error>> {
    try {
      const requiredFields = ['name', 'text', 'fields']
      for (const field of requiredFields) {
        if (httpRequest.body[field] === undefined) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, text, fields } = httpRequest.body
      const newTemplate = await this.addTemplate.add({
        name, text, fields
      })
      return created(newTemplate)
    } catch (error) {
      return internalServerError()
    }
  }
}
