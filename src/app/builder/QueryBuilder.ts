import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  constructor(
    public model: Query<T[], T>,
    public query: Record<string, unknown>
  ) { }

  search(searchableFields: string[]) {
    const searchTerm = this.query.searchTerm;
    if (searchTerm) {
      this.model = this.model.find({
        $or: searchableFields.map(
          (field: string) =>
            ({ [field]: { $regex: searchTerm, $options: "i" } } as FilterQuery<T>)
        ),
      });
    }
    return this;
  }

  filter() {
    const queryCopy = { ...this.query };
    const omittedFields = [
      "searchTerm",
      "sort",
      "page",
      "limit",
      "skip",
      "sortOrder",
      "sortBy",
    ];
    omittedFields.forEach((field) => delete queryCopy[field]);
    const price = queryCopy.price;

    if (price) {
      queryCopy["price"] = { $lte: price };
    }
    this.model = this.model.find(queryCopy as FilterQuery<T>);
    return this;
  }

  sort() {
    const sortOrder = this.query?.sortOrder || -1;
    const sortBy = this.query?.sortBy || "createdAt";

    if (sortOrder && sortBy) {
      this.model = this.model
        .find({})
        .sort({ [sortBy as string]: sortOrder === "asc" ? 1 : -1 });
    }

    return this;
  }

  pagination() {
    const { page, limit } = this.query;
    const pageIs = Number(page) || 1;
    const limitIs = Number(limit) || 5;
    const skipIs = (pageIs - 1) * limitIs;

    this.model = this.model.find({}).limit(limitIs).skip(skipIs);

    return this;
  }

  async countTotal() {
    const filterData = this.model.getFilter();
    const document = await this.model.model.countDocuments(filterData);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 5;
    const totalPage = Math.ceil(document / limit);

    return {
      document,
      page,
      limit,
      totalPage,
    };
  }
}

export default QueryBuilder;
