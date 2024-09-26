import { CustomError } from "./CustomError";

export class GeneralError extends CustomError {
  constructor(message = "") {
    const customId = message ? `:${message}` : "";
    super(`general${customId}`);
  }
}
