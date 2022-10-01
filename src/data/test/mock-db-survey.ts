import { SurveyModel } from '@/domain/models/survey/survey'
import { mockSurveyModel, mockSurveyModelLoadAllResponse } from '@/domain/test'
import { SurveyModelLoadAllResponse } from '@/domain/usecases/survey/load-surveys'
import { AddSurveyRepository } from '../protocols/db/survey/add-survey-repository'
import { LoadSurveyByIdRepository } from '../protocols/db/survey/load-survey-by-id-repository'
import { LoadSurveysRepository } from '../protocols/db/survey/load-surveys-repository'

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<SurveyModel | null> {
      return await Promise.resolve(mockSurveyModel('1'))
    }
  }
  return new LoadSurveyByIdRepositoryStub()
}

export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (accountId: string): Promise<SurveyModelLoadAllResponse[]> {
      return await Promise.resolve([
        mockSurveyModelLoadAllResponse(accountId),
        mockSurveyModelLoadAllResponse('2')
      ])
    }
  }
  return new LoadSurveysRepositoryStub()
}
