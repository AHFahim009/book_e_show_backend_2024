import { Response } from "express";

type TResponse<T> = {
  statusCode: number;
  message: string,
  discount?: number,
  token?: string;
  data?: T;
  meta?: any,
  clientSecret?: any
}


const sendResponse = <T>(res: Response, responseData: TResponse<T>) => {
  const { statusCode, message, data, discount, token, meta, clientSecret } = responseData
  return res.status(statusCode).json({
    success: true,
    message,
    discount,
    token,
    data,
    meta,
    clientSecret
  })
}

export default sendResponse

