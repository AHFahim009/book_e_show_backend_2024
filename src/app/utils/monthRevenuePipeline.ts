export const monthRevenuePipeline = (start: Date, end: Date) => {
  return [
    {
      $match: {
        createdAt: {
          $gte: start,
          $lte: end
        },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m", date: "$createdAt" },
        },
        count: { $sum: 1 },
        totalRevenue: { $sum: "$total" },
      },
    },
  ];

}