import { HttpResponse } from '../protocols'

export const created = (body: any): HttpResponse<typeof body> => ({
  statusCode: 201,
  body
})
