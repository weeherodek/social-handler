import { Decrypter } from '../protocols/cryptograph/decrypter'
import { Encrypter } from '../protocols/cryptograph/encrypter'
import { HashComparer } from '../protocols/cryptograph/hash-comparer'
import { Hasher } from '../protocols/cryptograph/hasher'

export const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    decrypt (accessToken: string): string | null {
      return 'decrypted_value'
    }
  }
  return new DecrypterStub()
}

export const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    encrypt (value: string): string {
      return 'encrypted_value'
    }
  }

  return new EncrypterStub()
}

export const mockHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return true
    }
  }

  return new HashComparerStub()
}

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return 'hashed_value'
    }
  }
  return new HasherStub()
}
