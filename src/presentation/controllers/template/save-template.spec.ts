import { MissingParamError } from '../../errors/'
import { Controller } from '../../protocols/'
import { SaveTemplateController } from './save-template'

const makeSut = (): Controller => {
  return new SaveTemplateController()
}

describe('Template Controller', () => {
  test('Should return status Code 400 if no name is provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        text: 'any_text'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return status Code 400 if no text is provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('text'))
  })
})
