import { HashComparer } from '@/data/protocols/cryptograph/hash-comparer'
import { BcryptAdapter } from '@/infra/cryptograph/bcrypt-adapter/bcrypt-adapter'
import env from '@/main/config/env'

export const makeHashComparer = (): HashComparer => {
  return new BcryptAdapter(env.salt)
}
