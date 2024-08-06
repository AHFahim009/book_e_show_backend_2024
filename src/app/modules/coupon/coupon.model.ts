import mongoose, { Schema } from "mongoose";
import { TCoupon } from "../interface";



const couponSchema = new Schema<TCoupon>(
  {
    couponCode: { type: String, required: [true, "Provide coupon code please !!"], unique: true },
    discount: { type: Number, required: [true, "Provide discount please!!"], }
  },
  {
    timestamps: true
  });




export const CouponModel = mongoose.model<TCoupon>('Coupon', couponSchema);

