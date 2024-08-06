import { TGenericError } from "../middlewares/globalError";

export const handleValidation = (err: any): TGenericError => {
  return {
    statusCode: 404,
    message: "Validation error",
    errorReason: "Provide all input value",
  };
};