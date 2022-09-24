import { loginPath, signupPath, surveysPath, surveysResultPath, templatePath } from './paths'
import {
  badRequestComponent, createdComponent, forbiddenComponent, internalServerErrorComponent,
  successComponent, unauthorizedComponent, noContentComponent
} from './components'
import {
  accessTokenSchema, loginParamsSchema, signupParamsSchema, accountSchema, surveySchema, addSurveyParamsSchema, surveyAnswerSchema, surveysSchema,
  apiKeyAuthSchema, answerSurveyParamsSchema, templateSchema, templateFieldSchema, addTemplateParamsSchema
} from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Social Handler',
    description: 'API Social Handler',
    version: '1.6.1'
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: 'https://www.gnu.org/licenses/gpl-3.0.en.html'
  },
  servers: [
    {
      url: '/api/',
      description: 'Current Environment'
    },
    {
      url: 'http:localhost:8080/api/',
      description: 'Local Host Server'
    },
    {
      url: 'https://socialhandler.com.br/api/',
      decription: 'Production Environment API'
    }
  ],
  tags: [
    {
      name: 'Login'
    },
    {
      name: 'Survey'
    },
    {
      name: 'Template'
    }
  ],
  paths: {
    '/signup': signupPath,
    '/login': loginPath,
    '/surveys': surveysPath,
    '/surveys/{surveyId}/results': surveysResultPath,
    '/template': templatePath
  },
  schemas: {
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
    addTemplateParams: addTemplateParamsSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    accessToken: successComponent('accessToken'),
    account: createdComponent('account'),
    surveys: successComponent('surveys'),
    template: createdComponent('template'),
    answerSurvey: successComponent('answerSurveyParams'),
    noContent: noContentComponent(),
    badRequest: badRequestComponent,
    unauthorized: unauthorizedComponent,
    forbidden: forbiddenComponent,
    internalServerError: internalServerErrorComponent
  }
}
