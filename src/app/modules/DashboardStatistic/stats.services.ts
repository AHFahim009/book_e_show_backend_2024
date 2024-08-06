import { calculatePercentage } from "../../utils/calculatePercentage";
import { monthRevenuePipeline } from "../../utils/monthRevenuePipeline";
import { productCategoryDisPipeline } from "../../utils/productCategoryDistPipeline";
import { TOrder } from "../interface";
import { OrderModel } from "../order/order.model";
import { ProductModel } from "../product/product.model";
import { UserModel } from "../user/user.model";

const dashboardStatistic = async () => {
  const currentDate = new Date();

  const sixMonthsPriorDate = new Date();
  sixMonthsPriorDate.setMonth(sixMonthsPriorDate.getMonth() - 6);

  const currentMonthRange = {
    start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
    end: currentDate,
  };
  const previousMonthRange = {
    start: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 0),
  };

  const currentMonthUserPromise = UserModel.countDocuments({
    createdAt: {
      $gte: currentMonthRange.start,
      $lte: currentMonthRange.end,
    },
  });
  const previousMonthUserPromise = UserModel.countDocuments({
    createdAt: {
      $gte: previousMonthRange.start,
      $lte: previousMonthRange.end,
    },
  });

  const currentMonthProductPromise = ProductModel.countDocuments({
    createdAt: {
      $gte: currentMonthRange.start,
      $lte: currentMonthRange.end,
    },
  });

  const previousMonthProductPromise = ProductModel.countDocuments({
    createdAt: {
      $gte: previousMonthRange.start,
      $lte: previousMonthRange.end,
    },
  });

  const sixMonthOrdersPromise = OrderModel.find({
    createdAt: {
      $gte: sixMonthsPriorDate,
      $lte: currentDate,
    },
  });


  const lastFourTransactionPromise = OrderModel.find().select(["ordersItem", "status",
    "discount", "total"
  ]).limit(4).sort({ createdAt: -1 })




  const currentMonthRevenuePipeline = monthRevenuePipeline(currentMonthRange.start, currentMonthRange.end)
  const previousMonthRevenuePipeline = monthRevenuePipeline(previousMonthRange.start, previousMonthRange.end)
  const productCategoryDistributionPipeline = productCategoryDisPipeline()

  const totalOrderRevenuePipeline = [
    {
      $group: {
        _id: null,
        totalSum: {
          $sum: "$total"
        },
        count: {
          $sum: 1
        }
      }
    }
  ]


  // Execute aggregation pipelines
  const [currentMonthUser,
    previousMonthUser,
    currentMonthProduct,
    previousMonthProduct,
    currentMonthOrder,
    previousMonthOrder,
    totalOrder,
    productCount,
    userCount,
    sixMonthOrders,
    productCategoryDistribution,
    maleUserCount,
    lastFourTransaction
  ] =
    await Promise.all([
      currentMonthUserPromise,
      previousMonthUserPromise,
      currentMonthProductPromise,
      previousMonthProductPromise,
      OrderModel.aggregate(currentMonthRevenuePipeline),
      OrderModel.aggregate(previousMonthRevenuePipeline),
      OrderModel.aggregate(totalOrderRevenuePipeline),
      ProductModel.countDocuments(),
      UserModel.countDocuments(),
      sixMonthOrdersPromise,
      ProductModel.aggregate(productCategoryDistributionPipeline),
      UserModel.countDocuments({ gender: "male" }),
      lastFourTransactionPromise
    ]);

  const currentMonthRevenue = currentMonthOrder.length > 0 ? currentMonthOrder[0] : { totalRevenue: 0, count: 0 }
  const previousMonthRevenue = previousMonthOrder.length > 0 ? previousMonthOrder[0] : { totalRevenue: 0, count: 0 }
  const totalOrderRevenue = totalOrder.length > 0 ? totalOrder[0] : 0


  const percentageChange = {
    revenuePercentage: calculatePercentage(currentMonthRevenue.totalRevenue, previousMonthRevenue.totalRevenue),
    productPercentage: calculatePercentage(currentMonthProduct, previousMonthProduct),
    userPercentage: calculatePercentage(currentMonthUser, previousMonthUser)
  }

  const entityCount = {
    totalOrderRevenue: totalOrderRevenue.totalSum,
    product: productCount,
    user: userCount,
    order: totalOrderRevenue.count
  }

  //  last six month data and revenue for graph
  const graphSixMonthOrder = new Array(6).fill(0) // 0 0 0 0 0 0 
  const graphSixMonthRevenue = new Array(6).fill(0)

  sixMonthOrders.forEach((order: any) => {
    const currentMonth = new Date().getMonth()  // april 3
    const orderCreatedMonth = order.createdAt.getMonth()// april 3
    const monthDiff = currentMonth - orderCreatedMonth  // 0
    // 0 1 2 3 4 5 
    if (monthDiff < 6) {
      graphSixMonthOrder[6 - monthDiff - 1] = 1,
        graphSixMonthRevenue[6 - monthDiff - 1] += order.total
    }
  })

  const graphStats = {
    graphSixMonthOrder,
    graphSixMonthRevenue
  }

  const genderRation = {
    male: maleUserCount,
    female: userCount - maleUserCount
  }

  const modifiedLastFourTransaction = lastFourTransaction.map((i) => ({
    _id: i._id,
    discount: i.discount,
    amount: i.total,
    quantity: i.ordersItem.length,
    status: i.status
  }))

  const result = {
    percentageChange,
    entityCount,
    graphStats,
    productCategoryDistribution,
    genderRation,
    lastFourTransaction: modifiedLastFourTransaction
  }

  return result
};

export const DashboardStatsServices = {
  dashboardStatistic,
};
