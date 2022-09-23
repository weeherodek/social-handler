import { ApplicationError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols/validation'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Middleware } from '@/presentation/protocols/middleware'

export class ValidatorHandlerDecorator implements Controller, Middleware {
  constructor (
    private readonly handler: Controller | Middleware,
    private readonly validation: Validation) {

  }

  async handle (httpRequest: HttpRequest<any, any, any>): Promise<HttpResponse> {
    const error = this.validation.validate({ ...httpRequest.body, ...httpRequest.headers, ...httpRequest.params })
    if (error) {
      throw new ApplicationError(error, 400)
    }
    const httpResponse = await this.handler.handle(httpRequest)
    return httpResponse
  }
}
