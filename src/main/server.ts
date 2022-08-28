import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

void (async () => {
  await MongoHelper.connect(env.mongoUrl).catch(console.error)
  const app = (await import ('./config/app')).default
  const port = env.port
  app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
})()
