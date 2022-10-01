import {
  createdComponent, noContentComponent, successComponent, badRequestComponent, forbiddenComponent, internalServerErrorComponent,
  unauthorizedComponent
} from './components'
import { apiKeyAuthSchema } from './schemas'

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  login: successComponent('login'),
  account: createdComponent('account'),
  surveys: successComponent('surveys'),
  template: createdComponent('template'),
  answerSurvey: successComponent('answerSurveyParams'),
  answerSurveyResult: successComponent('answerSurveyResult'),
  noContent: noContentComponent(),
  badRequest: badRequestComponent,
  unauthorized: unauthorizedComponent,
  forbidden: forbiddenComponent,
  internalServerError: internalServerErrorComponent
}
