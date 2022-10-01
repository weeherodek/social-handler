import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { LoadSurveys, SurveyModelLoadAllResponse } from '@/domain/usecases/survey/load-surveys'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async loadAll (accountId: string): Promise<SurveyModelLoadAllResponse[]> {
    const surveys = await this.loadSurveysRepository.loadAll(accountId)
    return surveys
  }
}
