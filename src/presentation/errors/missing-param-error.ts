export class MissingParamError extends Error {
  public statusCode: number = 400

  constructor (paramName: string) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
