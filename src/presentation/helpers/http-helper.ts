import { InternalServerError } from '../errors/'
import { HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  body: error
})

export const internalServerError = (): HttpResponse<Error> => ({
  statusCode: 500,
  body: new InternalServerError()
})
