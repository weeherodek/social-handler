import { InternalServerError } from '../errors/'
import { HttpResponse } from '../protocols'

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  body: {
    error,
    success: false,
    statusCode: 400
  }
})

export const internalServerError = (): HttpResponse<Error> => ({
  statusCode: 500,
  body: {
    error: new InternalServerError(),
    statusCode: 500,
    success: false
  }
})

export const created = (body: any): HttpResponse<typeof body> => ({
  statusCode: 201,
  body
})
