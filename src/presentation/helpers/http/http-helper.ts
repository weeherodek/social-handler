import { HttpResponse } from '../../protocols/http'

export const created = <T = any>(body: T): HttpResponse<T> => ({
  statusCode: 201,
  body: {
    statusCode: 201,
    success: true,
    data: body
  }
})

export const noContent = (): HttpResponse<null> => ({
  statusCode: 204,
  body: {
    statusCode: 204,
    success: true
  }
})

export const ok = <T = any>(body: T): HttpResponse<T> => ({
  statusCode: 200,
  body: {
    statusCode: 200,
    success: true,
    data: body
  }
})
