import { Router } from "express";
import { OrderControllers } from "./order.controllers";
import cacheMemory from "../../middlewares/cacheMemory";
import invalidCache from "../../middlewares/invalidCache";

const router = Router()

router.post("/create-order", invalidCache({ product: true, order: true, dashboardStats: true }), OrderControllers.createOrder)
router.get("/my-order/:userId", cacheMemory(), OrderControllers.myOrder)
router.get("/:userId", cacheMemory(), OrderControllers.getSingleOrder)
router.get("/", cacheMemory(), OrderControllers.allOrder)
router.put("/", cacheMemory(), OrderControllers.processOrder)
router.delete("/", cacheMemory(), OrderControllers.deleteOrder)


export const OrderRoutes = router