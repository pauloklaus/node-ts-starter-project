import { CustomError } from "./CustomError";

export class RequiredFieldError extends CustomError {
  constructor(message = "") {
    const customId = message ? `:${message}` : "";
    super(`required-field${customId}`);
  }
}
