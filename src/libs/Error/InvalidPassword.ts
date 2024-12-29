import { HTTP_STATUS_CODE } from "@src/constants/http";
import { ExtendableError } from ".";

export class InvalidPasswordError extends ExtendableError {
  private constructor(
    descriptor?: string,
    statusCode: number = HTTP_STATUS_CODE.UNAUTHORIZED
  ) {
    super(descriptor || "Invalid password provided", statusCode);
  }

  static create(
    descriptor?: string,
    statusCode: number = HTTP_STATUS_CODE.UNAUTHORIZED
  ) {
    const instance = new InvalidPasswordError(descriptor, statusCode);
    return instance;
  }
}
