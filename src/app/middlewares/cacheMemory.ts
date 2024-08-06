import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { myCache } from "../../app";

const cacheMemory = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (myCache.has(req.originalUrl)) {
      const catchResult = myCache.get(req.originalUrl) as any;

      return res.status(catchResult.statusCode).json(catchResult);
    }
    // individual user information saved
    if (myCache.has(`${req.originalUrl}/${req?.params.userId}`)) {
      console.log("if it is working ,response should come from this");

      const catchResult = myCache.get(
        `${req.originalUrl}/${req.params.userId}`
      ) as any;
      return res.status(catchResult?.statusCode).json(catchResult);
    }
    next();
  });
};

export default cacheMemory;
