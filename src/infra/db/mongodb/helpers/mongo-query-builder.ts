export class MongoQueryBuilder {
  private readonly query: Array<Record<any, any>> = []

  match (data: Record<any, any>): MongoQueryBuilder {
    this.query.push({
      $match: data
    })
    return this
  }

  group (data: Record<any, any>): MongoQueryBuilder {
    this.query.push({
      $group: data
    })
    return this
  }

  unwind (data: Record<any, any>): MongoQueryBuilder {
    this.query.push({
      $unwind: data
    })
    return this
  }

  lookup (data: Record<any, any>): MongoQueryBuilder {
    this.query.push({
      $lookup: data
    })
    return this
  }

  addFields (data: Record<any, any>): MongoQueryBuilder {
    this.query.push({
      $addFields: data
    })
    return this
  }

  project (data: Record<any, any>): MongoQueryBuilder {
    this.query.push({
      $project: data
    })
    return this
  }

  build (): Array<Record<any, any>> {
    return this.query
  }
}
