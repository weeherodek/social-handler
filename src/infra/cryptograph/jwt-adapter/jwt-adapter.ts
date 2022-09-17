
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Encrypter } from '@/data/protocols/cryptograph/encrypter'
import { Decrypter } from '@/data/protocols/cryptograph/decrypter'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {

  }

  encrypt (value: string): string {
    const token = jwt.sign({ id: value }, this.secret)
    return token
  }

  decrypt (value: string): string | null {
    const decryptedToken = jwt.verify(value, this.secret)
    const payload = decryptedToken as JwtPayload
    return decryptedToken ? payload.id : null
  }
}
