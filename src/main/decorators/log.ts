import { LogErrorRepository } from '@/data/protocols/log-error-repository'
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
      if (error instanceof Error && error.name === 'Error') {
        await this.logErroRepository.log(error.stack as string)
      }
      throw error
    }
  }
}
