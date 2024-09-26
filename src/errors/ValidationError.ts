import { CustomError } from "./CustomError";

export class ValidationError extends CustomError {
  constructor(message = "") {
    const customId = message ? `:${message}` : "";
    super(`validation${customId}`);
  }
}
