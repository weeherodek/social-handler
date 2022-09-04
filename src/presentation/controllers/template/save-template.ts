import { TemplateModel } from '@/domain/models/template/template'
import { AddTemplate } from '@/domain/usecases/template/add-template'
import { MissingParamError } from '@/presentation/errors/'
import { created } from '@/presentation/helpers/http/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class SaveTemplateController implements Controller {
  constructor (private readonly addTemplate: AddTemplate) {

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<TemplateModel>> {
    const requiredFields = ['name', 'text', 'fields']
    for (const field of requiredFields) {
      if (httpRequest.body[field] === undefined) {
        throw new MissingParamError(field)
      }
    }
    const { name, text, fields } = httpRequest.body
    const newTemplate = await this.addTemplate.add({
      name, text, fields
    })
    return created(newTemplate)
  }
}
