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
              $ref: '#/components/surveys'
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
