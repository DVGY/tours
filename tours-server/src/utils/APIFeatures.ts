import { Query, Document } from "mongoose";
/**
 * @public
 * A class to filter, sort, limit and paginate query params
 * @param T The Document Interface
 * @param U The query parameters inside req.params
 */

class APIFeatures<
  T extends Document,
  U extends {
    sort?: string;
    fields?: string;
    limit?: string;
    paginate?: string;
  }
> {
  query: Query<T[], T, unknown>;
  queryParams: U;
  constructor(query: Query<T[], T, unknown>, queryParams: U) {
    this.query = query;
    this.queryParams = queryParams;
  }

  /**
   * Remove the non mongoose Document props (sort,limit and etc)
   *
   * Find Document properties that matches value in Collection
   * @returns an instance of class
   */
  filter(): APIFeatures<T, U> {
    const queryParamsCopy = { ...this.queryParams };
    const excludedFields: (keyof U)[] = ["sort", "fields", "limit", "paginate"];

    excludedFields.forEach((params) => {
      delete queryParamsCopy[params];
    });
    let queryStr = JSON.stringify(queryParamsCopy);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }
}

export default APIFeatures;
