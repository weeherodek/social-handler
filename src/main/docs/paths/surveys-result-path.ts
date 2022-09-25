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
              $ref: '#/components/answerSurveyResult'
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
  },
  get: {
    security: [{ apiKeyAuth: [] }],
    tags: ['Survey'],
    summary: 'Get a survey result',
    parameters: [{
      in: 'path',
      name: 'surveyId',
      schema: {
        type: 'string'
      },
      required: true,
      description: 'Survey Id to get result'
    }],
    requestBody: {},
    responses: {
      200: {
        description: 'Survey Result',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/answerSurveyResult'
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
