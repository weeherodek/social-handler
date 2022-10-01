import { mockSurveyModelLoadAllResponse } from '@/domain/test'
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys'
import { noContent, ok } from '@/presentation/helpers/http/http-helper'
import { HttpRequest } from '@/presentation/protocols/http'
import { mockLoadSurveys } from '@/presentation/test/'
import { LoadSurveysController } from './load-surveys-controller'

const mockRequest = (): HttpRequest<{}> => ({
  accountId: 'any_account_id',
  body: {}
})

type SutTypes = {
  loadSurveysStub: LoadSurveys
  sut: LoadSurveysController
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = mockLoadSurveys()
  const sut = new LoadSurveysController(loadSurveysStub)
  return {
    sut,
    loadSurveysStub
  }
}

describe('LoadSurveys Controller', () => {
  test('Should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const spyLoad = jest.spyOn(loadSurveysStub, 'loadAll')
    const request = mockRequest()
    await sut.handle(request)
    expect(spyLoad).toHaveBeenCalledWith(request.accountId)
  })

  test('Should return list of surveys', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const surveys = await sut.handle(request)
    expect(surveys).toEqual(ok([mockSurveyModelLoadAllResponse(request.accountId), mockSurveyModelLoadAllResponse('2')]))
  })

  test('Should return no content if list of surveys is empty', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'loadAll').mockResolvedValue([])
    const surveys = await sut.handle(mockRequest())
    expect(surveys).toEqual(noContent())
  })

  test('Should throw if loadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'loadAll').mockRejectedValueOnce(new Error('Fake Error'))
    const promise = sut.handle(mockRequest())
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })
})
