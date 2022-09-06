import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'
import { ApplicationError } from '@/presentation/errors/application-error'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class LogControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
    private readonly logErroRepository: LogErrorRepository) {

  }

  async handle (httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
      const httpResponse = await this.controller.handle(httpRequest)
      return httpResponse
    } catch (error) {
      if (error instanceof Error && !(error instanceof ApplicationError)) {
        console.error(error)
        await this.logErroRepository.logError({
          stack: error.stack as string,
          params: httpRequest,
          controller: this.controller.constructor.name
        })
      }
      throw error
    }
  }
}
