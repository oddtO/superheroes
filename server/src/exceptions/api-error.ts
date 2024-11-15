import type { ZodError } from "zod";
export class ApiError extends Error {
  status: number;
  errorsWrapper?: ZodError;
  constructor(status: number, message: string, errorsWrapper?: ZodError) {
    super(message);
    this.status = status;
    this.errorsWrapper = errorsWrapper;
  }

  static BadRequest(message: string, errorsWrapper: ZodError) {
    return new ApiError(400, message, errorsWrapper);
  }

  static NotFoundError() {
    return new ApiError(404, "Not found");
  }
}
