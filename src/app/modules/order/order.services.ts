import mongoose from "mongoose";
import { TOrder } from "../interface";
import { ProductModel } from "../product/product.model";
import { OrderModel } from "./order.model";

const createOrder = async (payload: TOrder) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      shippingInfo,
      subTotal,
      tax,
      shippingCharge,
      discount,
      total,
      ordersItem,
      userId,
    } = payload;

    // Check product availability and update stock
    // Check product availability and update stock
    for (const item of ordersItem) {
      const product = await ProductModel.findById(item.productId)

      if (!product) {
        throw new Error(`Product with id ${item.productId} not found`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product: ${product.name}`);
      }

      // Update the stock using $inc operator
      await ProductModel.updateOne(
        { _id: item.productId },
        { $inc: { stock: -item.quantity } }
      )

    }

    // Create and save the order

    const result = await OrderModel.create(payload);
    await session.commitTransaction();
    session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};


// Get User Orders
const myOrder = async (userId: string) => {
  return await OrderModel.find({ userId })
}

// Get All Orders
const allOrder = async () => {
  return await OrderModel.find()
}

// Get Single Order by ID
const getSingleOrder = async (orderId: string) => {
  return await OrderModel.findById(orderId)
}

// Process Order (e.g., Update Order Status)
const processOrder = async (orderId: string) => {
  const order = await OrderModel.findById(orderId).exec();
  if (!order) {
    throw new Error(`Order with id ${orderId} not found`);
  }

  switch (order.status) {
    case 'Processing':
      order.status = 'Shipped';
      break;
    case 'Shipped':
      order.status = 'Delivered';
      break;
    case 'Delivered':
      // No change needed if the order is already delivered
      break;
    default:
      throw new Error(`Invalid order status: ${order.status}`);
  }

  await order.save();
  return order;
};


// Delete Order by ID
const deleteOrder = async (orderId: string) => {
  return await OrderModel.findByIdAndDelete(orderId)
}




export const OrderServices = {
  createOrder,
  allOrder, deleteOrder, getSingleOrder, processOrder, myOrder
};
