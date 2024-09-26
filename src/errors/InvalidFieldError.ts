import { CustomError } from "./CustomError";

export class InvalidFieldError extends CustomError {
  constructor(message = "") {
    const customId = message ? `:${message}` : "";
    super(`invalid-field${customId}`);
  }
}
