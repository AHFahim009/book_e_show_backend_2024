export const productCategoryDisPipeline = () => {
  return [
    {
      $group: {
        _id: "$category",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$count",
        },
        categories: {
          $push: {
            category: "$_id",
            count: "$count",
          },
        },
      },
    },
    {
      $unwind: "$categories",
    },
    {
      $project: {
        _id: 0,
        category: "$categories.category",
        percentage: {
          $multiply: [
            { $divide: ["$categories.count", "$total"] },
            100
          ]
        }
      },
    },
  ]
}