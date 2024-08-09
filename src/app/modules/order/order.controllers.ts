import { myCache } from "../../../app";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OrderServices } from "./order.services";

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.createOrder(req.body);

  sendResponse(res, {
    statusCode: 200,
    message: "Order created successfully",
    data: result,
  });
});

const myOrder = catchAsync(async (req, res) => {


  const { userId } = req.params
  console.log("order", userId);

  const result = await OrderServices.myOrder(userId)

  const responseData = {
    statusCode: 200,
    message: "My order retrieved successfully",
    data: result
  }
  myCache.set(`${req.originalUrl}/${req.params.userId}`, responseData)
  sendResponse(res, responseData)
})

const allOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.allOrder()

  const responseData = {
    statusCode: 200,
    message: "All order retrieved successfully",
    data: result
  }
  myCache.set(req.originalUrl, responseData)
  sendResponse(res, responseData)
})

const getSingleOrder = catchAsync(async (req, res) => {
  const { userId } = req.params
  const result = await OrderServices.getSingleOrder(userId)

  const responseData = {
    statusCode: 200,
    message: "single order retrieved successfully",
    data: result
  }
  myCache.set(req.originalUrl, responseData)
  sendResponse(res, responseData)
})

const processOrder = catchAsync(async (req, res) => {
  const { userId } = req.params
  const result = await OrderServices.processOrder(userId)

  const responseData = {
    statusCode: 200,
    message: "Order process successfully",
    data: result
  }
  sendResponse(res, responseData)
})

const deleteOrder = catchAsync(async (req, res) => {
  const { userId } = req.params
  const result = await OrderServices.deleteOrder(userId)

  const responseData = {
    statusCode: 200,
    message: "Order deleted successfully",
    data: result
  }
  sendResponse(res, responseData)
})

export const OrderControllers = {
  createOrder,
  myOrder,
  allOrder,
  getSingleOrder,
  processOrder,
  deleteOrder,
};
