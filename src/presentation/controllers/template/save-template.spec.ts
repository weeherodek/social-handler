import { TemplateModel } from '@/domain/models/template/template'
import { AddTemplate, AddTemplateModel } from '@/domain/usecases/template/add-template'
import { MissingParamError } from '@/presentation/errors/'
import { Controller, HttpRequest } from '@/presentation/protocols/'
import { SaveTemplateController } from './save-template'

jest.useFakeTimers({
  now: new Date('2020-01-01')
})

const makeFakeRequest = (): HttpRequest => ({
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
})

const makeAddTemplate = (): AddTemplate => {
  class AddTemplateStub implements AddTemplate {
    async add (template: AddTemplateModel): Promise<TemplateModel> {
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
  test('Should throw MissingParamError if no name is provided', async () => {
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
    await expect(httpResponse).rejects.toThrow(new MissingParamError('name'))
  })

  test('Should throw MissingParamErro if no text is provided', async () => {
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
    await expect(httpResponse).rejects.toThrow(new MissingParamError('text'))
  })

  test('Should throw MissingParamError if no fields is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        text: 'any_text'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    await expect(httpResponse).rejects.toThrow(new MissingParamError('fields'))
  })

  test('Should call AddTemplate with correct values', async () => {
    const { sut, addTemplateStub } = makeSut()
    const addAccountSpy = jest.spyOn(addTemplateStub, 'add')
    const httpRequest = makeFakeRequest()

    const { name, text, fields } = httpRequest.body

    await sut.handle(httpRequest)
    expect(addAccountSpy).toHaveBeenCalledWith({ name, text, fields })
  })

  test('Should throw Error if AddTemplate throws', async () => {
    const { sut, addTemplateStub } = makeSut()
    jest.spyOn(addTemplateStub, 'add').mockImplementationOnce(async () => {
      throw new Error()
    })
    const httpRequest = makeFakeRequest()

    const httpResponse = sut.handle(httpRequest)
    await expect(httpResponse).rejects.toThrow(new Error())
  })

  test('Should create template if correct params is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = makeFakeRequest()

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toEqual({
      id: 'any_id',
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
      ],
      date: new Date()
    })
  })
})
