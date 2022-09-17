import { MissingVariableError } from '@/presentation/errors/missing-variable-error'
import { TextVariablesValidation } from './text-variables-validation'

const makeSut = (): TextVariablesValidation => {
  return new TextVariablesValidation('text', 'fields')
}

describe('Text Variables Validation', () => {
  test('Should return message if text doesnt contain requiredField', () => {
    const sut = makeSut()
    const error = sut.validate({
      text: 'any_text',
      fields: [
        {
          name: 'any_name',
          required: true
        },
        {
          name: 'any_name_2',
          required: true
        }
      ]
    })
    expect(error).toBe(`${new MissingVariableError('any_name').message}, ${new MissingVariableError('any_name_2').message}`)
  })

  test('Should return null if find all fields', () => {
    const sut = makeSut()
    const validation = sut.validate({
      text: '{{any_name}} {{any_name_2}}',
      fields: [
        {
          name: 'any_name',
          required: true
        },
        {
          name: 'any_name_2',
          required: true
        }
      ]
    })
    expect(validation).toBeNull()
  })

  test('Should return null if none field is required', () => {
    const sut = makeSut()
    const validation = sut.validate({
      text: 'any_text',
      fields: [
        {
          name: 'any_name',
          required: false
        }
      ]
    })
    expect(validation).toBeNull()
  })

  test('Should return null if the field required is provided and miss the not required', () => {
    const sut = makeSut()
    const validation = sut.validate({
      text: '{{any_name}} ',
      fields: [
        {
          name: 'any_name',
          required: true
        },
        {
          name: 'any_name_2',
          required: false
        }
      ]
    })
    expect(validation).toBeNull()
  })
})
