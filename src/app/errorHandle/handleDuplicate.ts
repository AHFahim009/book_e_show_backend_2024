import { TGenericError } from "../middlewares/globalError";

export const handleDuplicateError = (err: any): TGenericError => {
  const match = err.message.match(/"([^"]*)"/);

  const result = match && match[0];

  return {
    statusCode: 404,
    message: "Duplicate entry",
    errorReason: `${result} already exit`,
  };
};