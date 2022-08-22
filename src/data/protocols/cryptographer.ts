export interface Cryptograph {
  crypto: (value: string) => Promise<string>
}
