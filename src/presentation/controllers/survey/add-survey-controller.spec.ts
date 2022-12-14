import { mockAddSurveyParams } from '@/domain/test'
import { AddSurvey, AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { noContent } from '@/presentation/helpers/http/http-helper'
import { HttpRequest } from '@/presentation/protocols/http'
import { mockAddSurvey } from '@/presentation/test'
import { AddSurveyController } from './add-survey-controller'

const mockRequest = (): HttpRequest<AddSurveyParams> => ({
  body: mockAddSurveyParams()
})

type SutTypes = {
  addSurveyStub: AddSurvey
  sut: AddSurveyController
}

const makeSut = (): SutTypes => {
  const addSurveyStub = mockAddSurvey()
  const sut = new AddSurveyController(addSurveyStub)
  return {
    sut,
    addSurveyStub
  }
}

describe('Add Survey Controller', () => {
  test('Should call AddSurvey with correct values', async () => {
    const { sut, addSurveyStub } = makeSut()
    const spyAdd = jest.spyOn(addSurveyStub, 'add')
    const request = mockRequest()
    await sut.handle(request)
    expect(spyAdd).toHaveBeenCalledWith(request.body)
  })

  test('Should throw if addSurvey throws', async () => {
    const { sut, addSurveyStub } = makeSut()
    jest.spyOn(addSurveyStub, 'add').mockImplementation(async () => await Promise.reject(new Error('Fake Error')))
    const promise = sut.handle(mockRequest())
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })

  test('Should return noContent on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(noContent())
  })
})
