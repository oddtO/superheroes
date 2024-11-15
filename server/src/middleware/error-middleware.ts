import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../exceptions/api-error";

export function errorMiddleware(
  err: Error,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __: NextFunction,
) {
  if (err instanceof ApiError) {
    res.status(err.status).json({
      message: err.message,
      errors: err.errorsWrapper,
    });
  } else {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
