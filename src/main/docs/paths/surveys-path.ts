export const surveysPath = {
  get: {
    tags: ['Survey'],
    summary: 'List all Surveys',
    responses: {
      200: {
        description: 'Load surveys',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/account'
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
  post: {
    security: [{ apiKeyAuth: [] }],
    tags: ['Survey'],
    summary: 'Add a new survey',
    requestBody: {
      description: 'Create new survey params',
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addSurveyParams'
          }
        }
      }
    },
    responses: {
      204: {
        description: 'Survey created with success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/noContent'
            }
          }
        }
      },
      401: {
        $ref: '#/components/unauthorized'
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
