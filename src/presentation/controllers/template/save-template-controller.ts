import { TemplateModel } from '@/domain/models/template/template'
import { AddTemplate, AddTemplateModel } from '@/domain/usecases/template/add-template'
import { AlreadyExistsError } from '@/presentation/errors/already-exists-error'
import { created } from '@/presentation/helpers/http/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class AddTemplateController implements Controller {
  constructor (private readonly addTemplate: AddTemplate) {

  }

  async handle (httpRequest: HttpRequest<AddTemplateModel>): Promise<HttpResponse<TemplateModel>> {
    const newTemplate = await this.addTemplate.add({ ...httpRequest.body })
    if (newTemplate) return created(newTemplate)
    throw new AlreadyExistsError('Template', httpRequest.body.name)
  }
}
