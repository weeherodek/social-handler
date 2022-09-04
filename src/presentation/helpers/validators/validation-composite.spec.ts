import { Validation } from './validation'
import { ValidationComposite } from './validation-composite'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (data: any): string | null {
      return new Error('Error Message').message
    }
  }
  return new ValidationStub()
}

const makeSut = (): ValidationComposite => {
  const validation = makeValidation()
  return new ValidationComposite([validation])
}

describe('Validation Composite', () => {
  test('Should returns the erros found in the composite', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_field' })
    expect(error).toBe(new Error('Error Message').message)
  })
})
