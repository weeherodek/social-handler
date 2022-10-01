import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { SurveyModel } from '@/domain/models/survey/survey'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository) {}
  async loadById (surveyId: string): Promise<SurveyModel | null> {
    const survey = await this.loadSurveyByIdRepository.loadById(surveyId)
    return survey
  }
}
