export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017/social-handler',
  port: process.env.PORT ?? 8080,
  accountCollection: 'accounts',
  templateCollection: 'templates',
  messageCollection: 'messages'
}
