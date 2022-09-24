export const templatePath = {
  post: {
    security: [{ apiKeyAuth: [] }],
    tags: ['Template'],
    summary: 'Add a new template',
    requestBody: {
      description: 'Create new template params',
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addTemplateParams'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Template created with success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/template'
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
