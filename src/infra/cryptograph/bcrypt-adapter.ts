import bcrypt from 'bcrypt'

import { Hasher } from '@/data/protocols/cryptograph/hasher'
import { HashComparer } from '@/data/protocols/cryptograph/hash-comparer'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {}

  async hash (value: string): Promise<string> {
    const hashedValue = await bcrypt.hash(value, this.salt)
    return hashedValue
  }

  async compare (value: string, hash: string): Promise<boolean> {
    const comparison = await bcrypt.compare(value, hash)
    return comparison
  }
}
