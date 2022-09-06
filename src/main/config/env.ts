export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017/social-handler',
  port: process.env.PORT ?? 8080,
  accountCollection: process.env.ACCOUNT_COLLECTION ?? 'accounts',
  templateCollection: process.env.TEMPLATE_COLLECTION ?? 'templates',
  messageCollection: process.env.MESSAGE_COLLECTION ?? 'messages',
  errorLogCollection: process.env.ERROR_LOG_COLLECTION ?? 'errorsLog',
  salt: Number(process.env.SALT) ?? 12,
  jwtSecret: process.env.JWT_SECRET ?? 'AjiuAJdijaij$iaijda@i12312CasokPS'
}
