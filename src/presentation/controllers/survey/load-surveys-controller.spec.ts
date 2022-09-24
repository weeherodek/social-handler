import { mockSurveyModel } from '@/domain/test'
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys'
import { noContent, ok } from '@/presentation/helpers/http/http-helper'
import { mockLoadSurveys } from '@/presentation/test/'
import { LoadSurveysController } from './load-surveys-controller'

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
    await sut.handle({ body: {} })
    expect(spyLoad).toHaveBeenCalled()
  })

  test('Should return list of surveys', async () => {
    const { sut } = makeSut()
    const surveys = await sut.handle({ body: {} })
    expect(surveys).toEqual(ok([mockSurveyModel('1'), mockSurveyModel('2')]))
  })

  test('Should return no content if list of surveys is empty', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'loadAll').mockResolvedValue([])
    const surveys = await sut.handle({ body: {} })
    expect(surveys).toEqual(noContent())
  })

  test('Should throw if loadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'loadAll').mockRejectedValueOnce(new Error('Fake Error'))
    const promise = sut.handle({ body: {} })
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })
})
