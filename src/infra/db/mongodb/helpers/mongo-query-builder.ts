export class MongoQueryBuilder {
  private readonly query: Array<Record<string, any>> = []

  match (data: Record<string, any>): MongoQueryBuilder {
    this.query.push({
      $match: data
    })
    return this
  }

  group (data: Record<string, any>): MongoQueryBuilder {
    this.query.push({
      $group: data
    })
    return this
  }

  unwind (data: Record<string, any>): MongoQueryBuilder {
    this.query.push({
      $unwind: data
    })
    return this
  }

  lookup (data: Record<string, any>): MongoQueryBuilder {
    this.query.push({
      $lookup: data
    })
    return this
  }

  project (data: Record<string, any>): MongoQueryBuilder {
    this.query.push({
      $project: data
    })
    return this
  }

  sort (data: Record<string, any>): MongoQueryBuilder {
    this.query.push({
      $sort: data
    })
    return this
  }

  build (): Array<Record<string, any>> {
    return this.query
  }
}
