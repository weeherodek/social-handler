import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { SurveyModel } from '@/domain/models/survey/survey'
import { mockSurveyModel } from '@/domain/test'
import { DbLoadSurveyById } from './db-load-survey-by-id'

const makeLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<SurveyModel | null> {
      return await Promise.resolve(mockSurveyModel('1'))
    }
  }
  return new LoadSurveyByIdRepositoryStub()
}

type SutTypes = {
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
  sut: DbLoadSurveyById
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = makeLoadSurveyByIdRepository()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub)
  return {
    sut,
    loadSurveyByIdRepositoryStub
  }
}

describe('DbLoadSurveyById Usecase', () => {
  test('Should call LoadSurveyByIdRepository with correct value', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    const spyLoadbyId = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    await sut.loadById('1')
    expect(spyLoadbyId).toHaveBeenCalledWith('1')
  })

  test('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockRejectedValueOnce(new Error('Fake Error'))
    const promise = sut.loadById('1')
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })

  test('Should return SurveyModel if LoadSurveyByIdRepository returns a survey', async () => {
    const { sut } = makeSut()
    const survey = await sut.loadById('1')
    expect(survey).toEqual(mockSurveyModel('1'))
  })

  test('Should return null if LoadSurveyByIdRepository returns null', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockResolvedValueOnce(null)
    const survey = await sut.loadById('1')
    expect(survey).toBeNull()
  })
})
