import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError {
  constructor(message = "") {
    const customId = message ? `:${message}` : "";
    super(`not-found${customId}`);
  }
}
