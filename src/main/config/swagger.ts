import { serve, setup } from 'swagger-ui-express'
import { Express } from 'express'
import { noCache } from '../middlewares/no-cache'

export default (app: Express): void => {
  app.use('/docs', noCache, serve, setup())
}