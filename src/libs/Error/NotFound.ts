import { HTTP_STATUS_CODE } from "../../constants/http";

import { ExtendableError } from ".";

export class NotFoundError extends ExtendableError {
  private constructor(
    descriptor?: string,
    statusCode: number = HTTP_STATUS_CODE.NOT_FOUND
  ) {
    super(descriptor || "Resource not found", statusCode);
  }

  static create(
    descriptor?: string,
    statusCode: number = HTTP_STATUS_CODE.NOT_FOUND
  ) {
    const instance = new NotFoundError(descriptor, statusCode);
    return instance;
  }
}
