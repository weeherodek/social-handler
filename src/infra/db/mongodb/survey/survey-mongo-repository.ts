import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { SurveyModel } from '@/domain/models/survey/survey'
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { SurveyModelLoadAllResponse } from '@/domain/usecases/survey/load-surveys'
import { ObjectId } from 'mongodb'
import { MongoQueryBuilder } from '../helpers'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyLoadAllModelMongo } from './domain/survey-model-mongo'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  constructor (private readonly surveyCollection: string) {}
  async add (surveyData: AddSurveyParams): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection<Omit<SurveyModel, 'id'>>(this.surveyCollection)
    await surveyCollection.insertOne({ ...surveyData, date: new Date() })
  }

  async loadAll (accountId: string): Promise<SurveyModelLoadAllResponse[]> {
    const surveyCollection = await MongoHelper.getCollection<SurveyModel>(this.surveyCollection)
    const query = new MongoQueryBuilder()
      .lookup({
        from: 'surveyResults',
        localField: '_id',
        foreignField: 'surveyId',
        as: 'result'
      }).project({
        _id: 1,
        question: 1,
        answers: 1,
        date: 1,
        didAnswer: {
          $gte: [
            {
              $size: {
                $filter: {
                  input: '$result',
                  as: 'item',
                  cond: {
                    $eq: [
                      '$$item.accountId', new ObjectId(accountId)
                    ]
                  }
                }
              }
            }, 1
          ]
        }
      })
      .build()

    const surveys = await surveyCollection.aggregate<SurveyLoadAllModelMongo>(query).toArray()
    return MongoHelper.mapArray<SurveyModelLoadAllResponse>(surveys)
  }

  async loadById (surveyId: string): Promise<SurveyModel | null> {
    const surveyCollection = await MongoHelper.getCollection<SurveyModel>(this.surveyCollection)
    const survey = await surveyCollection.findOne({ _id: new ObjectId(surveyId) })
    return (survey && MongoHelper.map<SurveyModel>(survey))
  }
}
