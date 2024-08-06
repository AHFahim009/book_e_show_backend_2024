import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { handleDuplicateError } from "../errorHandle/handleDuplicate";
import { handleValidation } from "../errorHandle/handleValidation";

export type TGenericError = {
  statusCode: number;
  message: string;
  errorReason: string;
};

const globalError: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const success = false;
  let statusCode = err?.statusCode || 500;
  let message = err?.message || "Something went wrong";
  let errorReason = "";
  const errorDetails = err;

  if (err?.code === 11000) {
    ({ message, errorReason, statusCode } = handleDuplicateError(err));
  } else if (err instanceof ZodError) {
    ({ message, errorReason, statusCode } = handleValidation(err));
  }

  res.status(statusCode).json({
    success,
    message,
    errorReason,
    errorDetails,
  });
};

export default globalError;
