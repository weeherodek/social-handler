export type HttpResponse<T = any> = {
  statusCode: number
  body: {
    data?: T
    error?: T
    statusCode: number
    success: boolean
  }
}

export type HttpRequest<T = any, Headers = never, Params = never> = {
  body: T
  accountId?: string
} & HttpRequestHeader<Headers> & HttpRequestParam<Params>

type HttpRequestHeader<H> = [H] extends [never] ? {} : { headers: H }

type HttpRequestParam<P> = [P] extends [never] ? {} : { params: P}
