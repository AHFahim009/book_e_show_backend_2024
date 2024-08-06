import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { AuthServices } from "./auth.services"

const login = catchAsync(async (req, res) => {
  const result = await AuthServices.login(req.body)

  sendResponse(res, {
    statusCode: 200,
    message: "User login successfully",
    data: result
  })
})

export const AuthControllers = {
  login
}