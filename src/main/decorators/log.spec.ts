import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { LogControllerDecorator } from './log'

const makeGenericRequest = (): HttpRequest => ({ body: 'fake_body' })

const makeGenericController = (): Controller => {
  class GenericControllerStub implements Controller {
    async handle (httpRequest: HttpRequest<string>): Promise<HttpResponse<string>> {
      return {
        body: {
          statusCode: 200,
          data: 'fake_data',
          success: true
        },
        statusCode: 200
      }
    }
  }
  return new GenericControllerStub()
}

interface sutTypes {
  genericControllerStub: Controller
  sut: LogControllerDecorator
}

const makeSut = (): sutTypes => {
  const genericControllerStub = makeGenericController()
  const sut = new LogControllerDecorator(genericControllerStub)
  return {
    sut,
    genericControllerStub
  }
}

describe('Log Controller Decorator', () => {
  test('Should call controller with correct values', async () => {
    const { sut, genericControllerStub } = makeSut()
    const handleSpy = jest.spyOn(genericControllerStub, 'handle')
    const request = makeGenericRequest()
    await sut.handle(request)
    expect(handleSpy).toHaveBeenCalledWith(request)
  })

  test('Should return the data of the called controller', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeGenericRequest())
    expect(httpResponse).toEqual({
      body: {
        statusCode: 200,
        data: 'fake_data',
        success: true
      },
      statusCode: 200
    })
  })

  test('Should throw the error if the controller throws', async () => {
    const { sut, genericControllerStub } = makeSut()
    jest.spyOn(genericControllerStub, 'handle').mockRejectedValueOnce(new Error('Fake Error'))
    const promise = sut.handle(makeGenericRequest())
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })
})
