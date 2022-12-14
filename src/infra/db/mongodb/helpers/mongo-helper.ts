import { Collection, MongoClient, WithId, ObjectId, Document } from 'mongodb'

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

  async getCollection<collectionType extends Document>(name: string): Promise<Collection<collectionType>> {
    if (!this.client) {
      await this.connect(this.url)
    }
    return this.client.db().collection<collectionType>(name)
  },

  map<T> (data: WithId<Document>): T {
    const { _id, ...rest } = data
    const object = Object.assign({}, rest as T, { id: _id.toString() })
    return object
  },

  mapArray<T>(list: Array<WithId<Document>>): T[] {
    return list.map((data) => this.map(data))
  },

  mapId (id: string): ObjectId {
    return new ObjectId(id)
  }

}
