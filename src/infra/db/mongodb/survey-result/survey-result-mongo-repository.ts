import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { SurveyResultModel } from '@/domain/models/survey-result/survey-result'
import { SaveSurveyResultModel } from '@/domain/usecases/survey-result/save-survey-result'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  constructor (
    private readonly surveyResultCollection: string,
    private readonly surveyCollection: string,
    private readonly accountCollection: string
  ) {}

  async saveResult (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection<SurveyResultModel>(this.surveyResultCollection)
    const now = new Date()
    const result = await surveyResultCollection.findOneAndUpdate({
      surveyId: data.surveyId,
      accountId: data.accountId
    },
    {
      $set: {
        answer: data.answer,
        date: now
      }
    }, {
      upsert: true,
      returnDocument: 'after'
    })

    return {
      ...data,
      id: result.value?._id.toString() as string,
      date: now
    }
  }
}
