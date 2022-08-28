import { TemplateModel } from '@/domain/models/template/template'
import { AddTemplate } from '@/domain/usecases/template/add-template'
import { MissingParamError } from '@/presentation/errors/'
import { created } from '@/presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols/'

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
