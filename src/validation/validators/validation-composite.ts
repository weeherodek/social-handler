import { Validation } from '../../presentation/protocols/validation'

export class ValidationComposite implements Validation {
  constructor (private readonly validations: Validation[]) {}

  validate (data: any): string | null {
    const errors = []
    try {
      for (const validation of this.validations) {
        const error = validation.validate(data)
        if (error) {
          errors.push(error)
        }
      }
      return errors.join(', ')
    } catch (err) {
      console.error(err)
      return errors.join(', ')
    }
  }
}
