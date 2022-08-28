export class InternalServerError extends Error {
  public statusCode: number = 500

  constructor () {
    super('Internal Server Error')
    this.name = 'InternalServerError'
  }
}
