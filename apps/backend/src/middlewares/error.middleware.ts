import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { ApiResponse } from "../utils/apiResponse";

export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    return ApiResponse.error(
      res,
      err.message,
      err.statusCode
    );
  }

  console.error(err);

  return ApiResponse.error(
    res,
    "Internal Server Error",
    500
  );
};