import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validationGuard = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    schema.parseAsync(req.body)
      .then(() => next())
      .catch((error) => next(error))
  }
}


export default validationGuard