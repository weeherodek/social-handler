import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class LogControllerDecorator implements Controller {
  constructor (private readonly controller: Controller) {

  }

  async handle (httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
      const httpResponse = await this.controller.handle(httpRequest)
      return httpResponse
    } catch (error) {
      if (error instanceof Error) {
        // Salvo erro no banco
      }
      throw error
    }
  }
}
