import { AppError } from "../../errorHandle/AppError";
import { TCoupon } from "../interface";
import { CouponModel } from "./coupon.model";

const createCoupon = async (couponData: TCoupon) => {
  const { couponCode, discount } = couponData;

  // Check if the coupon code already exists
  const existingCoupon = await CouponModel.findOne({ couponCode });
  if (existingCoupon) {
    throw new AppError(404, "Coupon code already exists");
  }

  // Create the new coupon

  return await CouponModel.create(couponData);
};


const applyDiscount = async (couponCode: string) => {
  // Find the coupon by couponCode
  const coupon = await CouponModel.findOne({ couponCode });

  // If no coupon is found, throw an error
  if (!coupon) {
    throw new AppError(404, 'Coupon code not found');
  }

  // Return the discount value
  return Number(coupon.discount);
};
const getAllCoupon = async () => {
  // Retrieve all coupons from the database
  const coupons = await CouponModel.find();

  // Return the list of coupons
  return coupons;
};

export const CouponServices = {
  createCoupon, applyDiscount, getAllCoupon
};
