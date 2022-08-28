import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {

  client: null as unknown as MongoClient,

  async connect (connection: string): Promise<void> {
    this.client = await MongoClient.connect(connection)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  }
}
