import {
  addSurveyParamsSchema, answerSurveyParamsSchema, accessTokenSchema, accountSchema, surveySchema, surveysSchema,
  surveyAnswerSchema, templateSchema, templateFieldSchema, loginParamsSchema, signupParamsSchema, addTemplateParamsSchema,
  answerSurveyResultResponse
} from './schemas/'

export default {
  accessToken: accessTokenSchema,
  account: accountSchema,
  survey: surveySchema,
  surveys: surveysSchema,
  surveyAnswer: surveyAnswerSchema,
  template: templateSchema,
  templateField: templateFieldSchema,
  loginParams: loginParamsSchema,
  signupParams: signupParamsSchema,
  addSurveyParams: addSurveyParamsSchema,
  answerSurveyParams: answerSurveyParamsSchema,
  answerSurveyResult: answerSurveyResultResponse,
  addTemplateParams: addTemplateParamsSchema
}