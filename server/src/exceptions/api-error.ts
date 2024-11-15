import type { ZodError } from "zod";
export class ApiError extends Error {
  status: number;
  errorsWrapper?: unknown;
  constructor(status: number, message: string, errorsWrapper?: unknown) {
    super(message);
    this.status = status;
    this.errorsWrapper = errorsWrapper;
  }

  static BadRequest(message: string, errorsWrapper?: unknown) {
    return new ApiError(400, message, errorsWrapper);
  }

  static NotFoundError() {
    return new ApiError(404, "Not found");
  }
}
