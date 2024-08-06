import { myCache } from "../../../app";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { DashboardStatsServices } from "./stats.services";

const dashboardStatistic = catchAsync(async (req, res) => {

  const result = await DashboardStatsServices.dashboardStatistic()

  const responseData = {
    statusCode: 201,
    message: "Dashboard stats retrieved successfully",
    data: result
  }

  myCache.set(req.originalUrl, responseData)
  sendResponse(res, responseData)

})

export const DashboardStatsControllers = {
  dashboardStatistic
}