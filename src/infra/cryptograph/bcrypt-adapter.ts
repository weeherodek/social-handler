import bcrypt from 'bcrypt'

import { Cryptograph } from '@/data/protocols/cryptographer'

export class BcryptAdapter implements Cryptograph {
  constructor (private readonly salt: number) {}

  async crypto (value: string): Promise<string> {
    const hashedValue = await bcrypt.hash(value, this.salt)
    return hashedValue
  }
}
