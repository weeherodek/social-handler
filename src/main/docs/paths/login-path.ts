export const loginPath = {
  post: {
    tags: ['Login'],
    summary: 'User Login',
    requestBody: {
      description: 'Login params',
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/loginParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Login with success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/login'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      500: {
        $ref: '#/components/internalServerError'
      }
    }
  }
}
