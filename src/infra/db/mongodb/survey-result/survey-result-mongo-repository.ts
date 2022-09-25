import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { SaveSurveyResultParams, SaveSurveyResultResponse } from '@/domain/usecases/survey-result/save-survey-result'
import { ObjectId } from 'mongodb'
import { MongoHelper, MongoQueryBuilder } from '../helpers/'
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
      }
      ).unwind({
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
          count: '$count',
          percent: '$percent'
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
    const surveyResult = surveysResult[0]
    return { ...surveyResult, surveyId: surveyResult.surveyId.toString() }
  }
}
