import { SurveyModel } from '@/domain/models/survey/survey'
import { mockSurveyModel, mockSurveyModelLoadAllResponse } from '@/domain/test'
import { AddSurvey, AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { LoadSurveys, SurveyModelLoadAllResponse } from '@/domain/usecases/survey/load-surveys'

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (survey: AddSurveyParams): Promise<void> {
      return await Promise.resolve()
    }
  }

  return new AddSurveyStub()
}

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel | null> {
      return mockSurveyModel()
    }
  }

  return new LoadSurveyByIdStub()
}

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async loadAll (accountId: string): Promise<SurveyModelLoadAllResponse[]> {
      return [mockSurveyModelLoadAllResponse(accountId), mockSurveyModelLoadAllResponse('2')]
    }
  }
  return new LoadSurveysStub()
}
