import { Decrypter } from '@/data/protocols/cryptograph/decrypter'
import { JwtAdapter } from '@/infra/cryptograph/jwt-adapter/jwt-adapter'
import env from '@/main/config/env'

export const makeDecrypter = (): Decrypter => {
  return new JwtAdapter(env.jwtSecret)
}
