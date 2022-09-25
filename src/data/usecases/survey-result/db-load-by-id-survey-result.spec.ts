import { LoadByIdSurveyResultRepository } from '@/data/protocols/db/survey-result/load-by-idsurvey-result-repository'
import { mockLoadByIdSurveyResultRepository } from '@/data/test'
import { DbLoadByIdSurveyResult } from './db-load-by-id-survey-result'

type SutTypes = {
  loadByIdSurveyResultRepositoryStub: LoadByIdSurveyResultRepository
  sut: DbLoadByIdSurveyResult
}

const makeSut = (): SutTypes => {
  const loadByIdSurveyResultRepositoryStub = mockLoadByIdSurveyResultRepository()
  const sut = new DbLoadByIdSurveyResult(loadByIdSurveyResultRepositoryStub)
  return {
    sut,
    loadByIdSurveyResultRepositoryStub
  }
}

describe('DbLoadByIdSurveyResult Usecase', () => {
  test('Shoud call LoadSurveyResultByIdRepository with correct value', async () => {
    const { sut, loadByIdSurveyResultRepositoryStub } = makeSut()
    const spyLoadByIdSurveyResult = jest.spyOn(loadByIdSurveyResultRepositoryStub, 'loadByIdSurveyResult')
    await sut.loadResult('any_survey_id')
    expect(spyLoadByIdSurveyResult).toHaveBeenCalledWith('any_survey_id')
  })
})
