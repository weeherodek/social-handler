import { ApplicationError } from '@/presentation/errors'
import { Validation } from '@/presentation/helpers/validators/validation'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class ValidatorDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
    private readonly validation: Validation) {

  }

  async handle (httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const error = this.validation.validate(httpRequest)
    if (error) {
      throw new ApplicationError(error, 400)
    }
    const httpResponse = await this.controller.handle(httpRequest)
    return httpResponse
  }
}
