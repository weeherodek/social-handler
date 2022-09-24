export const surveysResultPath = {
  put: {
    security: [{ apiKeyAuth: [] }],
    tags: ['Survey'],
    summary: 'Answer a survey',
    parameters: [{
      in: 'path',
      name: 'surveyId',
      schema: {
        type: 'string'
      },
      required: true,
      description: 'Survey Id to be answered'
    }],
    requestBody: {
      description: 'Answer a survey params',
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/answerSurveyParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Survey answered',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/answerSurvey'
            }
          }
        }
      },
      403: {
        $ref: '#/components/forbidden'
      },
      500: {
        $ref: '#/components/internalServerError'
      }
    }
  }
}
