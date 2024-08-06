import { myCache } from "../../app"
import catchAsync from "../utils/catchAsync"

type TInvalidCacheProp = {
  product?: boolean,
  order?: boolean,
  dashboardStats?: boolean
}

const invalidCache = ({ product, order, dashboardStats }: TInvalidCacheProp) => {
  return catchAsync(async (req, res, next) => {
    const productCache = "/api/v1/products"
    const orderCache = "/api/v1/orders"
    const dashboardCache = "/api/v1/dashboard/stats"
    const catchStoredKeys = myCache.keys()


    if (product) {
      const filteredCacheKeys = catchStoredKeys.filter((ele) => ele.startsWith(productCache))
      myCache.del(filteredCacheKeys)
    }
    if (order) {
      const filteredCacheKeys = catchStoredKeys.filter((ele) => ele.startsWith(orderCache))
      myCache.del(filteredCacheKeys)
    }

    if (dashboardStats) {
      const filteredCacheKeys = catchStoredKeys.filter((ele) => ele.startsWith(dashboardCache))
      myCache.del(filteredCacheKeys)
    }
    next()
  })
}

export default invalidCache