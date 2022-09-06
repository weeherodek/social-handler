import { Collection, MongoClient, WithId, Document } from 'mongodb'

export const MongoHelper = {

  client: null as unknown as MongoClient,

  url: null as unknown as string,

  async connect (connection: string): Promise<void> {
    this.url = connection
    this.client = await MongoClient.connect(connection)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null as unknown as MongoClient
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.url)
    }
    return this.client.db().collection(name)
  },

  map (data: WithId<Document>): any {
    const { _id, ...rest } = data
    const object = Object.assign({}, rest, { id: _id.toString() })
    return object
  }
}
