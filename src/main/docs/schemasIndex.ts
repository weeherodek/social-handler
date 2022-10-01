import {
  addSurveyParamsSchema, answerSurveyParamsSchema, loginSchema, accountSchema, surveySchema, surveysSchema,
  surveyAnswerSchema, templateSchema, templateFieldSchema, loginParamsSchema, signupParamsSchema, addTemplateParamsSchema,
  answerSurveyResultResponse
} from './schemas/'

export default {
  login: loginSchema,
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
