export type HttpResponse<T = any> = {
  statusCode: number
  body: {
    data?: T
    error?: T
    statusCode: number
    success: boolean
  }
}

export type HttpRequest<T = any> = {
  body: T
  headers?: Record<string, string>
}
