import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { ProductRoutes } from "../modules/product/product.routes";

import { PaymentRoutes } from "../modules/payment/payment.routes";
import { OrderRoutes } from "../modules/order/order.routes";
import { CouponRoutes } from "../modules/coupon/coupon.routes";
import { DashboardStatsRoutes } from "../modules/DashboardStatistic/stats.routes";

const router = Router()

type TApplicationRoutes = {
  name: string;
  endPoints: any
}[]


const applicationRoutes: TApplicationRoutes = [
  {
    name: "/users",
    endPoints: UserRoutes
  },
  {
    name: "/auth",
    endPoints: AuthRoutes
  },
  {
    name: "/products",
    endPoints: ProductRoutes
  },
  {
    name: "/orders",
    endPoints: OrderRoutes
  },

  {
    name: "/payment",
    endPoints: PaymentRoutes
  },
  {
    name: "/coupon",
    endPoints: CouponRoutes
  },
  {
    name: "/dashboard",
    endPoints: DashboardStatsRoutes
  },

]

applicationRoutes.forEach((route) => router.use(route.name, route.endPoints))

export default router