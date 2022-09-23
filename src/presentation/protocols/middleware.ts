import { HttpRequest, HttpResponse } from './http'

export interface Middleware {
  handle: (httpRequest: HttpRequest<any, any, any>) => Promise<HttpResponse>
}
