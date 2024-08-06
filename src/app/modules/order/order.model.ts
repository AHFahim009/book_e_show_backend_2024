import mongoose, { Schema } from 'mongoose';
import { TOrder, TOrdersItem, TShippingInfo } from '../interface';

// Define the TOrdersItem schema
const OrdersItemSchema = new Schema<TOrdersItem>({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
});

// Define the TShippingInfo schema
const ShippingInfoSchema = new Schema<TShippingInfo>({
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  pinCode: { type: Number, required: true }
});

// Define the TOrder schema
const OrderSchema = new Schema<TOrder>({
  shippingInfo: { type: ShippingInfoSchema, required: true },
  subTotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  shippingCharge: { type: Number, required: true },
  discount: { type: Number, required: true },
  total: { type: Number, required: true },
  status: { type: String, enum: ['Processing', 'Shipped', 'Delivered'], required: true, default: "Processing" },
  ordersItem: { type: [OrdersItemSchema], required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}
  , {
    timestamps: true
  });

// Create Mongoose models

export const OrderModel = mongoose.model<TOrder>('Order', OrderSchema);


