import { LoadByIdSurveyResultRepository } from '@/data/protocols/db/survey-result/load-by-id-survey-result-repository'
import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { SurveyResultModel, SurveyResultResponseModel } from '@/domain/models/survey-result/survey-result'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { ObjectId } from 'mongodb'
import { MongoHelper, MongoQueryBuilder } from '../helpers/'
import { SurveyResultModelMongo, SurveyResultResponseMongo } from './domain/survey-result-model-mongo'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository, LoadByIdSurveyResultRepository {
  constructor (
    private readonly surveyResultCollection: string
  ) {}

  async saveResult (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection<SurveyResultModelMongo>(this.surveyResultCollection)
    const surveyResult = await surveyResultCollection.findOneAndUpdate({
      surveyId: new ObjectId(data.surveyId),
      accountId: new ObjectId(data.accountId)
    },
    {
      $set: {
        answer: data.answer,
        date: new Date()
      }
    }, {
      upsert: true,
      returnDocument: 'after'
    })

    const value = surveyResult.value as SurveyResultModelMongo
    const valueWithoutObjectId = MongoHelper.map<SurveyResultModel>(surveyResult.value as SurveyResultModelMongo)
    return {
      ...valueWithoutObjectId,
      id: value._id.toString(),
      accountId: value.accountId.toString(),
      surveyId: value.surveyId.toString()
    }
  }

  async loadByIdSurveyResult (surveyId: string, accountId: string): Promise<SurveyResultResponseModel | null> {
    const surveyResultCollection = await MongoHelper.getCollection<SurveyResultModelMongo>(this.surveyResultCollection)

    const query = new MongoQueryBuilder()
      .match({
        surveyId: new ObjectId(surveyId)
      })
      .group({
        _id: 0,
        data: {
          $push: '$$ROOT'
        },
        total: {
          $sum: 1
        }
      })
      .unwind({
        path: '$data'
      })
      .lookup({
        from: 'surveys',
        localField: 'data.surveyId',
        foreignField: '_id',
        as: 'survey'
      })
      .unwind({
        path: '$survey'
      })
      .group({
        _id: {
          surveyId: '$survey._id',
          question: '$survey.question',
          date: '$data.date',
          total: '$total',
          answer: '$data.answer',
          answers: '$survey.answers'
        },
        count: {
          $sum: 1
        },
        currentAccountAnswer: {
          $push: {
            $cond: [{ $eq: ['$data.accountId', new ObjectId(accountId)] }, '$data.answer', '$invalid']
          }
        }
      })
      .project({
        _id: 0,
        surveyId: '$_id.surveyId',
        question: '$_id.question',
        date: '$_id.date',
        answers: {
          $map: {
            input: '$_id.answers',
            as: 'item',
            in: {
              $mergeObjects: [
                '$$item', {
                  count: {
                    $cond: {
                      if: {
                        $eq: [
                          '$$item.answer', '$_id.answer'
                        ]
                      },
                      then: '$count',
                      else: 0
                    }
                  },
                  percent: {
                    $cond: {
                      if: {
                        $eq: [
                          '$$item.answer', '$_id.answer'
                        ]
                      },
                      then: {
                        $multiply: [
                          {
                            $divide: [
                              '$count', '$_id.total'
                            ]
                          }, 100
                        ]
                      },
                      else: 0
                    }
                  },
                  isCurrentAnswerCount: {
                    $cond: [{
                      $eq: ['$$item.answer', { $arrayElemAt: ['$currentAccountAnswer', 0] }]
                    }, 1, 0]
                  }
                }
              ]
            }
          }
        }
      })
      .group({
        _id: {
          surveyId: '$surveyId',
          question: '$question',
          date: '$date'
        },
        answers: {
          $push: '$answers'
        }
      })
      .project({
        _id: 0,
        surveyId: '$_id.surveyId',
        question: '$_id.question',
        date: '$_id.date',
        answers: {
          $reduce: {
            input: '$answers',
            initialValue: [],
            in: {
              $concatArrays: [
                '$$value', '$$this'
              ]
            }
          }
        }
      })
      .unwind({
        path: '$answers'
      })
      .group({
        _id: {
          surveyId: '$surveyId',
          question: '$question',
          date: '$date',
          answer: '$answers.answer',
          image: '$answers.image'
        },
        count: {
          $sum: '$answers.count'
        },
        percent: {
          $sum: '$answers.percent'
        },
        isCurrentAnswerCount: {
          $sum: '$answers.isCurrentAnswerCount'
        }
      })
      .project({
        _id: 0,
        surveyId: '$_id.surveyId',
        question: '$_id.question',
        date: '$_id.date',
        answer: {
          answer: '$_id.answer',
          image: '$_id.image',
          count: { $round: ['$count'] },
          percent: { $round: ['$percent'] },
          isCurrentAnswer: {
            $eq: ['$isCurrentAnswerCount', 1]
          }
        }
      })
      .sort({
        'answer.count': -1
      })
      .group({
        _id: {
          surveyId: '$surveyId',
          question: '$question',
          date: '$date'
        },
        answers: {
          $push: '$answer'
        }
      })
      .project({
        _id: 0,
        surveyId: '$_id.surveyId',
        question: '$_id.question',
        date: '$_id.date',
        answers: '$answers'
      })
      .build()

    const surveysResult = await surveyResultCollection.aggregate<SurveyResultResponseMongo>(query).toArray()
    return surveysResult.length ? { ...surveysResult[0], surveyId: surveysResult[0].surveyId.toString() } : null
  }
}
