import { Router } from "express";
import { PaymentControllers } from "./payment.controllers";
const router = Router()

router.post("/create-payment",
  PaymentControllers.createPayment
)




export const PaymentRoutes = router