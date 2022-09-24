import { HttpRequest, HttpResponse } from './http'

export interface Controller {
  handle: (httpRequest: HttpRequest<any, any, any>) => Promise<HttpResponse>
}
