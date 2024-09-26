import { CustomError } from "./CustomError";

export class ForbiddenError extends CustomError {
  constructor(message = "") {
    const customId = message ? `:${message}` : "";
    super(`forbidden${customId}`);
  }
}
