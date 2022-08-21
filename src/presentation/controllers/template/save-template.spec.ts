import { TemplateModel } from '@/domain/models/template/template'
import { AddTemplate, AddTemplateModel } from '@/domain/usecases/template/add-template'
import { MissingParamError } from '../../errors/'
import { Controller } from '../../protocols/'
import { SaveTemplateController } from './save-template'

const makeAddTemplate = (): AddTemplate => {
  class AddTemplateStub implements AddTemplate {
    add (template: AddTemplateModel): TemplateModel {
      return {
        id: 'any_id',
        date: new Date(),
        name: 'any_name',
        text: 'any_text',
        fields: [{
          name: 'any_name_1',
          required: true,
          defaultValue: ''
        },
        {
          name: 'any_name_2',
          required: false,
          defaultValue: '123'
        }
        ]
      }
    }
  }
  return new AddTemplateStub()
}

interface sutTypes {
  sut: Controller
  addTemplateStub: AddTemplate
}

const makeSut = (): sutTypes => {
  const addTemplateStub = makeAddTemplate()
  const sut = new SaveTemplateController(addTemplateStub)
  return {
    sut,
    addTemplateStub
  }
}

describe('Template Controller', () => {
  test('Should return status Code 400 if no name is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        text: 'any_text',
        fields: [{
          name: 'any_name_1',
          required: true,
          defaultValue: ''
        }]
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return status Code 400 if no text is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        fields: [{
          name: 'any_name_1',
          required: true,
          defaultValue: ''
        }]
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('text'))
  })

  test('Should return status Code 400 if no fields is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        text: 'any_text'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('fields'))
  })

  test('Should call AddTemplate with correct values', () => {
    const { sut, addTemplateStub } = makeSut()
    const addAccountSpy = jest.spyOn(addTemplateStub, 'add')
    const httpRequest = {
      body: {
        name: 'any_text',
        text: 'any_text',
        fields: [{
          name: 'any_name_1',
          required: false,
          defaultValue: ''
        }, {
          name: 'any_name_2',
          required: false,
          defaultValue: '123'
        }]
      }
    }

    const { name, text, fields } = httpRequest.body

    sut.handle(httpRequest)
    expect(addAccountSpy).toHaveBeenCalledWith({ name, text, fields })
  })
})
