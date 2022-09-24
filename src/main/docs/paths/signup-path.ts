export const signupPath = {
  post: {
    tags: ['Login'],
    summary: 'User Signup',
    requestBody: {
      description: 'Signup params',
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signupParams'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'User created with success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/account'
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
