import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PaymentServices } from "./payment.services";


const createPayment = catchAsync(async (req, res) => {
  const result = await PaymentServices.createPayment(req.body)

  sendResponse(res, {
    statusCode: 200,
    message: "Payment created successfully",
    clientSecret: result
  })
})

export const PaymentControllers = {
  createPayment
}