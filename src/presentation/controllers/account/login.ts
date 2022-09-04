import { MissingParamError } from '@/presentation/errors'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['email', 'password']
    for (const field of requiredFields) {
      if (httpRequest.body[field] === undefined) {
        throw new MissingParamError(field)
      }
    }

    return await Promise.resolve({
      body: {
        anyBody: 'test',
        statusCode: 200,
        success: true
      },
      statusCode: 200
    })
  }
}
