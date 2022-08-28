export class InvalidParamError extends Error {
  public statusCode: number = 400

  constructor (paramName: string) {
    super(`Invalid param: ${paramName}`)
    this.name = 'InvalidParamError'
  }
}
