import { Router } from "express";
import { DashboardStatsControllers } from "./stats.controllers";
import cacheMemory from "../../middlewares/cacheMemory";

const router = Router()

router.get("/stats", cacheMemory(), DashboardStatsControllers.dashboardStatistic)





export const DashboardStatsRoutes = router