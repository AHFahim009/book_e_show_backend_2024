import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CouponServices } from "./coupon.services";

const createCoupon = catchAsync(async (req, res) => {
  const result = await CouponServices.createCoupon(req.body)

  sendResponse(res, {
    statusCode: 200,
    message: "Coupon created successfully",
    data: result
  })
})

const applyDiscount = catchAsync(async (req, res) => {
  const { couponCode } = req?.query
  if (!couponCode) throw new Error("Please provide coupon code")
  const result = await CouponServices.applyDiscount(couponCode as string)

  sendResponse(res, {
    statusCode: 200,
    message: "Discount apply successfully",
    discount: result
  })
})

const getAllCoupon = catchAsync(async (req, res) => {

  const result = await CouponServices.getAllCoupon()

  sendResponse(res, {
    statusCode: 200,
    message: "All coupon retrieved successfully",
    data: result
  })
})



export const CouponControllers = {
  createCoupon,
  applyDiscount,
  getAllCoupon
}