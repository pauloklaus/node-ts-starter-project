import { CustomError } from "./CustomError";

export class UnauthorizedError extends CustomError {
  constructor(message = "") {
    const customId = message ? `:${message}` : "";
    super(`unauthorized${customId}`);
  }
}
