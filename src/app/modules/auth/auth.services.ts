import config from "../../config";
import { AppError } from "../../errorHandle/AppError";
import { TAuth } from "../interface";
import { UserModel } from "../user/user.model";
import jwt from "jsonwebtoken"

const login = async (payload: TAuth) => {

  // step 1: verify the email
  const user = await UserModel.findOne({ email: payload.email })
  if (!user) throw new AppError(404, "Please create an account!!");
  // step 2: match the password
  const matchPassword = user.password === payload.password
  if (!matchPassword) throw new AppError(404, "Password doesn't match!!");

  //step 3: jwt token
  const jwtPayload = {
    name: user.name,
    email: user.email,
    role: user.role
  }
  const accessToken = jwt.sign(jwtPayload, config.SECRET_TOKEN as string,
    { algorithm: "HS256", expiresIn: config.EXPIRE_IN })

  return {
    token: accessToken
  }

}


export const AuthServices = {
  login
}