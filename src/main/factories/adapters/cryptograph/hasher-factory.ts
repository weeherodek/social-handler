import { Hasher } from '@/data/protocols/cryptograph/hasher'
import { BcryptAdapter } from '@/infra/cryptograph/bcrypt-adapter/bcrypt-adapter'
import env from '@/main/config/env'

export const makeHasher = (): Hasher => {
  return new BcryptAdapter(env.salt)
}
