import { MissingVariableError } from '@/presentation/errors/missing-variable-error'
import { Validation } from '@/presentation/protocols/validation'

export class TextVariablesValidation implements Validation {
  constructor (
    private readonly text: string,
    private readonly fields: string) {}

  validate (data: any): string | null {
    const errors: string[] = []
    data[this.fields].forEach((field: { name: string, required: boolean }) => {
      const fieldName = field.name
      const isRequired = field.required
      if (!data[this.text].includes(`{{${fieldName}}}`) && isRequired) {
        errors.push(new MissingVariableError(fieldName).message)
      }
    })

    return errors.length ? errors.join(', ') : null
  }
}
