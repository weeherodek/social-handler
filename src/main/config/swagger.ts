import { serve, setup } from 'swagger-ui-express'
import { Express } from 'express'
import { noCache } from '../middlewares/no-cache'
import ApiDefinition from '../docs'

export default (app: Express): void => {
  app.use('/docs', noCache, serve, setup(ApiDefinition))
}
