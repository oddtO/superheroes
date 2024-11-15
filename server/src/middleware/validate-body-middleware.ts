import { z } from "zod";
import type { ZodRawShape } from "zod";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../exceptions/api-error";
export function validateBodyMiddleware<T extends ZodRawShape>(
  schema: z.ZodObject<T>,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        next(ApiError.BadRequest("Validation error", err));
      } else {
        next(err);
      }
    }
  };
}
