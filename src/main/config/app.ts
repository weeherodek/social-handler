import 'express-async-errors'
import express from 'express'
import setupSwagger from './swagger'
import setupMiddlewares from './middlewares'
import setutRoutes from './routes'
import { errorHandler } from '../middlewares'

const app = express()
setupSwagger(app)
setupMiddlewares(app)
setutRoutes(app)
app.use(errorHandler)

export default app
