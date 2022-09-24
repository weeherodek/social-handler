import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { mockAddSurveyParams } from '@/domain/test'
import { DbAddSurvey } from './db-add-survey'

const makeAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new AddSurveyRepositoryStub()
}

type SutTypes = {
  addSurveyRepositoryStub: AddSurveyRepository
  sut: DbAddSurvey
}

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = makeAddSurveyRepository()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)
  return {
    sut,
    addSurveyRepositoryStub
  }
}

describe('DbAddSurvey Usecase', () => {
  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const spyAdd = jest.spyOn(addSurveyRepositoryStub, 'add')
    const survey = mockAddSurveyParams()
    await sut.add(survey)
    expect(spyAdd).toHaveBeenCalledWith(survey)
  })

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'add').mockImplementationOnce(async () => await Promise.reject(new Error('Fake Error')))
    const promise = sut.add(mockAddSurveyParams())
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })
})
