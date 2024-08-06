import { NextFunction, Request, RequestHandler, Response } from "express";


// high order function that takes an async fn as a parameter and handle the promise;
const catchAsync = (asyncFn: RequestHandler) =>
  (req: Request, res: Response, next: NextFunction) => Promise.resolve(asyncFn(req, res, next)).catch((error) => next(error))


export default catchAsync
