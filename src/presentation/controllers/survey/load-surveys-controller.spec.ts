import { SurveyModel } from '@/domain/models/survey/survey'
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys'
import { ok } from '@/presentation/helpers/http/http-helper'
import { LoadSurveysController } from './load-surveys-controller'

const makeFakeSurveyModel = (id: string): SurveyModel => ({
  id,
  question: 'fake question',
  answers: [{
    answer: 'Fake Answer 1',
    image: 'Fake Image'
  },
  {
    answer: 'Fake Answer 2',
    image: 'Fake Image'
  }],
  date: new Date()
})

const makeLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async loadAll (): Promise<SurveyModel[]> {
      return [makeFakeSurveyModel('1'), makeFakeSurveyModel('2')]
    }
  }
  return new LoadSurveysStub()
}

interface sutTypes {
  loadSurveysStub: LoadSurveys
  sut: LoadSurveysController
}

const makeSut = (): sutTypes => {
  const loadSurveysStub = makeLoadSurveys()
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
    expect(surveys).toEqual(ok([makeFakeSurveyModel('1'), makeFakeSurveyModel('2')]))
  })

  test('Should throw if loadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'loadAll').mockRejectedValueOnce(new Error('Fake Error'))
    const promise = sut.handle({ body: {} })
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })
})
