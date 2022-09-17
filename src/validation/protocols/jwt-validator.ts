export interface JwtValidator {
  isValid: (value: string) => boolean
}
