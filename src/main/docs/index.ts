import { loginPath, signupPath, surveyPath, surveysPath } from './paths'
import { badRequestComponent, createdComponent, forbiddenComponent, internalServerErrorComponent, successComponent, unauthorizedComponent, noContentComponent } from './components'
import { accessTokenSchema, loginParamsSchema, signupParamsSchema, accountSchema, surveySchema, addSurveyParamsSchema, surveyAnswerSchema, surveysSchema, apiKeyAuthSchema } from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Social Handler',
    description: 'API Social Handler',
    version: '1.5.1'
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
    }
  ],
  paths: {
    '/signup': signupPath,
    '/login': loginPath,
    '/survey': surveyPath,
    '/surveys': surveysPath
  },
  schemas: {
    accessToken: accessTokenSchema,
    account: accountSchema,
    survey: surveySchema,
    surveys: surveysSchema,
    surveyAnswer: surveyAnswerSchema,
    loginParams: loginParamsSchema,
    signupParams: signupParamsSchema,
    addSurveyParams: addSurveyParamsSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    accessToken: successComponent('accessToken'),
    account: createdComponent('account'),
    surveys: successComponent('surveys'),
    noContent: noContentComponent(),
    badRequest: badRequestComponent,
    unauthorized: unauthorizedComponent,
    forbidden: forbiddenComponent,
    internalServerError: internalServerErrorComponent
  }
}
