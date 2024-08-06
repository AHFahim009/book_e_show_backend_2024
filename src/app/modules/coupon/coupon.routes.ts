import { Router } from "express";
import { CouponControllers } from "./coupon.controllers";

const router = Router()

router.post(
  "/create-coupon",
  CouponControllers.createCoupon
)

router.get(
  "/",
  CouponControllers.getAllCoupon
)

router.get(
  "/applyDiscount",
  CouponControllers.applyDiscount
)






export const CouponRoutes = router