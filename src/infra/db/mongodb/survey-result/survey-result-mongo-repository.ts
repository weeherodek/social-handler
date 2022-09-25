import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { SurveyResultModel } from '@/domain/models/survey-result/survey-result'
import { SaveSurveyResultParams, SaveSurveyResultResponse } from '@/domain/usecases/survey-result/save-survey-result'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyResultModelMongo, SurveyResultResponseMongo } from './domain/survey-result-model-mongo'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  constructor (
    private readonly surveyResultCollection: string
  ) {}

  async saveResult (data: SaveSurveyResultParams): Promise<SaveSurveyResultResponse> {
    const surveyResultCollection = await MongoHelper.getCollection<SurveyResultModelMongo>(this.surveyResultCollection)
    await surveyResultCollection.findOneAndUpdate({
      surveyId: new ObjectId(data.surveyId),
      accountId: new ObjectId(data.accountId)
    },
    {
      $set: {
        answer: data.answer,
        date: new Date()
      }
    }, {
      upsert: true
    })

    const surveyResult = await this.loadSurveyResultById(data.surveyId)
    return surveyResult
  }

  private async loadSurveyResultById (surveyId: string): Promise<SaveSurveyResultResponse> {
    const surveyResultCollection = await MongoHelper.getCollection<SurveyResultModel>(this.surveyResultCollection)
    const query = surveyResultCollection.aggregate<SurveyResultResponseMongo>([
      {
        $match: {
          surveyId: new ObjectId(surveyId)
        }
      }, {
        $group: {
          _id: 0,
          data: {
            $push: '$$ROOT'
          },
          count: {
            $sum: 1
          }
        }
      }, {
        $unwind: {
          path: '$data'
        }
      }, {
        $lookup: {
          from: 'surveys',
          localField: 'data.surveyId',
          foreignField: '_id',
          as: 'survey'
        }
      }, {
        $unwind: {
          path: '$survey'
        }
      }, {
        $group: {
          _id: {
            surveyId: '$survey._id',
            question: '$survey.question',
            date: '$survey.date',
            total: '$count',
            answer: {
              $filter: {
                input: '$survey.answers',
                as: 'item',
                cond: {
                  $eq: [
                    '$$item.answer', '$data.answer'
                  ]
                }
              }
            }
          },
          count: {
            $sum: 1
          }
        }
      }, {
        $unwind: {
          path: '$_id.answer'
        }
      }, {
        $addFields: {
          '_id.answer.count': '$count',
          '_id.answer.percent': {
            $multiply: [
              {
                $divide: [
                  '$count', '$_id.total'
                ]
              }, 100
            ]
          }
        }
      }, {
        $group: {
          _id: {
            surveyId: '$_id.surveyId',
            question: '$_id.question',
            date: '$_id.date'
          },
          answers: {
            $push: '$_id.answer'
          }
        }
      }, {
        $project: {
          _id: 0,
          surveyId: '$_id.surveyId',
          question: '$_id.question',
          date: '$_id.date',
          answers: '$answers'
        }
      }
    ])

    const surveysResult = await query.toArray()
    const surveyResult = surveysResult[0]
    return { ...surveyResult, surveyId: surveyResult.surveyId.toString() }
  }
}
