import {
  createdComponent, noContentComponent, successComponent, badRequestComponent, forbiddenComponent, internalServerErrorComponent,
  unauthorizedComponent
} from './components'
import { apiKeyAuthSchema } from './schemas'

export default {
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
