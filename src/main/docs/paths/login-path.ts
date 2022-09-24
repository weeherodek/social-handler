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
              $ref: '#/schemas/accessToken'
            }
          }
        }
      }
    }
  }
}
