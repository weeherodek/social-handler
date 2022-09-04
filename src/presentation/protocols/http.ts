export interface HttpResponse<T = any> {
  statusCode: number
  body: {
    data?: T
    error?: T
    statusCode: number
    success: boolean
  }
}

export interface HttpRequest<T = any> {
  body: T
}
