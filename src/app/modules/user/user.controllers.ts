import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.services";

const createUser = catchAsync(async (req, res) => {

  const result = await UserServices.createUser(req.body, res)

  sendResponse(res, {
    statusCode: 200,
    message: "User created successfully",
    token: result.token,
    data: result.result
  })
})
const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUser()

  sendResponse(res, {
    statusCode: 200,
    message: "All user retrieved successfully",
    data: result
  })
})

const singleUser = catchAsync(async (req, res) => {
  const { _id } = req.params
  const result = await UserServices.singleUser(_id)

  sendResponse(res, {
    statusCode: 200,
    message: " Single User retrieved successfully",
    data: result
  })
})

const updateUser = catchAsync(async (req, res) => {
  const { _id } = req.params
  const result = await UserServices.updateUser(_id, req.body)

  sendResponse(res, {
    statusCode: 200,
    message: "User update successfully",
    data: result
  })
})

const deleteUser = catchAsync(async (req, res) => {
  const { _id } = req.params
  const result = await UserServices.deleteUser(_id)

  sendResponse(res, {
    statusCode: 200,
    message: "User deleted successfully",
    data: result
  })
})

export const UserControllers = {
  createUser,
  getAllUser,
  singleUser,
  updateUser,
  deleteUser
}