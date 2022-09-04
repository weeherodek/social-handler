import { HttpResponse } from '../../protocols/http'

export const created = (body: any): HttpResponse<typeof body> => ({
  statusCode: 201,
  body: {
    statusCode: 201,
    success: true,
    data: body
  }
})

export const ok = (body: any): HttpResponse<typeof body> => ({
  statusCode: 200,
  body: {
    statusCode: 200,
    success: true,
    data: body
  }
})
