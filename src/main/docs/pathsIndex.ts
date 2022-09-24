import { loginPath, signupPath, surveysPath, surveysResultPath, templatePath } from './paths'

export default {
  '/signup': signupPath,
  '/login': loginPath,
  '/surveys': surveysPath,
  '/surveys/{surveyId}/results': surveysResultPath,
  '/template': templatePath
}
