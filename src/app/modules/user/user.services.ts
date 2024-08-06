import { Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { TUser } from "../interface";
import { UserModel } from "./user.model";
import jwt from "jsonwebtoken"
import config from "../../config";


const createUser = async (payload: TUser, res: Response) => {

  //  if user already exit than user can log in with authorization token


  const IsUserExit = await UserModel.findOne({ email: payload.email })
  if (IsUserExit) {

    //step 3: jwt token
    const jwtPayload = {
      name: payload.name,
      email: payload.email,
      role: "admin" //payload.role
    }
    const accessToken = jwt.sign(jwtPayload, config.SECRET_TOKEN as string,
      { algorithm: "HS256", expiresIn: config.EXPIRE_IN })


    sendResponse(res, {
      statusCode: 200,
      message: `welcome back ${IsUserExit.name}`,
      token: accessToken,
      data: IsUserExit
    })
  }
  // for first time : store user information in database and give access the logged user authorization
  const jwtPayload = {
    name: payload.name,
    email: payload.email,
    role: payload.role
  }
  const accessToken = jwt.sign(jwtPayload, config.SECRET_TOKEN as string,
    { algorithm: "HS256", expiresIn: config.EXPIRE_IN })

  const result = await UserModel.create(payload)
  return {
    token: accessToken,
    result
  }
}


const getAllUser = async () => {
  return await UserModel.find().select("-password")
}

const singleUser = async (_id: string) => {
  const result = await UserModel.findById(_id)
  return result
}

const updateUser = async (_id: string, payload: any) => {
  const result = await UserModel.findOneAndUpdate(
    { _id },
    payload,
    {
      new: true
    }
  )
  return result
}

const deleteUser = async (_id: string) => {
  await UserModel.deleteOne({ _id })
  return null
}

export const UserServices = {
  createUser,
  getAllUser,
  singleUser,
  updateUser,
  deleteUser

}