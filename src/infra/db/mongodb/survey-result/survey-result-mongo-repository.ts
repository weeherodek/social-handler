import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { SurveyResultModel } from '@/domain/models/survey-result/survey-result'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { WithId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  constructor (
    private readonly surveyResultCollection: string
  ) {}

  async saveResult (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
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

    const surveyResult = MongoHelper.map<SurveyResultModel>(result.value as WithId<SurveyResultModel>)

    return surveyResult
  }
}
