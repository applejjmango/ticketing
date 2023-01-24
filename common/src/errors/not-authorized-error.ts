import { CustomError } from "@/errors/custom-error";

export class NotAuthorizedError extends CustomError {
  statusCode = 401; // Forbidden

  constructor() {
    super("Not Authorized");

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: "Not authorized" }];
  }
}
