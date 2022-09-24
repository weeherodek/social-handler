import { mockAddTemplateParams } from '@/domain/test'
import { AddTemplate, AddTemplateParams } from '@/domain/usecases/template/add-template'
import { AlreadyExistsError } from '@/presentation/errors/already-exists-error'
import { created } from '@/presentation/helpers/http/http-helper'
import { HttpRequest } from '@/presentation/protocols/http'
import { mockAddTemplate } from '@/presentation/test'
import { AddTemplateController } from './add-template-controller'

const mockRequest = (): HttpRequest<AddTemplateParams> => ({
  body: mockAddTemplateParams()
})

type SutTypes = {
  sut: AddTemplateController
  addTemplateStub: AddTemplate
}

const makeSut = (): SutTypes => {
  const addTemplateStub = mockAddTemplate()
  const sut = new AddTemplateController(addTemplateStub)
  return {
    sut,
    addTemplateStub
  }
}

describe('Template Controller', () => {
  test('Should call AddTemplate with correct values', async () => {
    const { sut, addTemplateStub } = makeSut()
    const addAccountSpy = jest.spyOn(addTemplateStub, 'add')
    const request = mockRequest()

    const { name, text, fields } = request.body

    await sut.handle(request)
    expect(addAccountSpy).toHaveBeenCalledWith({ name, text, fields })
  })

  test('Should throw Error if AddTemplate throws', async () => {
    const { sut, addTemplateStub } = makeSut()
    jest.spyOn(addTemplateStub, 'add').mockImplementationOnce(async () => {
      throw new Error()
    })
    const request = mockRequest()

    const httpResponse = sut.handle(request)
    await expect(httpResponse).rejects.toThrow(new Error())
  })

  test('Should create template if correct params is provided', async () => {
    const { sut } = makeSut()

    const request = mockRequest()

    const response = await sut.handle(request)

    expect(response).toEqual(created({
      id: 'any_id',
      name: request.body.name,
      text: request.body.text,
      fields: [request.body.fields[0], request.body.fields[1]],
      date: new Date()
    }))
  })

  test('Should throw AlreadyExistsError if addTemplate returns null', async () => {
    const { sut, addTemplateStub } = makeSut()
    jest.spyOn(addTemplateStub, 'add').mockResolvedValueOnce(null)
    const request = mockRequest()
    const promise = sut.handle(request)
    await expect(promise).rejects.toThrow(new AlreadyExistsError('Template', request.body.name))
  })
})
