import { Encrypter } from '@/data/protocols/cryptograph/encrypter'
import { JwtAdapter } from '@/infra/cryptograph/jwt-adapter/jwt-adapter'
import env from '@/main/config/env'

export const makeEncrypter = (): Encrypter => {
  return new JwtAdapter(env.jwtSecret)
}
