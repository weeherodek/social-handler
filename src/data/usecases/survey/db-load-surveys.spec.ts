import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { mockLoadSurveysRepository } from '@/data/test'
import { mockSurveyModelLoadAllResponse } from '@/domain/test'
import { DbLoadSurveys } from './db-load-surveys'

type SutTypes = {
  loadSurveysRepositoryStub: LoadSurveysRepository
  sut: DbLoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = mockLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
  return {
    sut,
    loadSurveysRepositoryStub
  }
}

describe('DbLoadSurveys Usecase', () => {
  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const spyLoadAll = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    await sut.loadAll('any_account_id')
    expect(spyLoadAll).toHaveBeenCalledWith('any_account_id')
  })

  test('Should return a list of SurveyModel', async () => {
    const { sut } = makeSut()
    const surveys = await sut.loadAll('any_account_id')
    expect(surveys).toEqual([
      mockSurveyModelLoadAllResponse('any_account_id'),
      mockSurveyModelLoadAllResponse('2')
    ])
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockRejectedValueOnce(new Error('Fake Error'))
    const promise = sut.loadAll('any_account_id')
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })

  test('Should return a empty array if LoadSurveysRepository return a empty array', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockResolvedValueOnce([])
    const list = await sut.loadAll('any_account_id')
    expect(list).toEqual([])
  })
})
