import { stripeInstance } from "../../../app"
import { AppError } from "../../errorHandle/AppError"


const createPayment = async (payload: any) => {
  const { amount } = payload
  if (!amount) throw new AppError(404, "please enter amount")

  const result = await stripeInstance.paymentIntents.create({
    amount: amount,
    currency: "usd"
  })

  return result.client_secret
}




export const PaymentServices = {
  createPayment,


}