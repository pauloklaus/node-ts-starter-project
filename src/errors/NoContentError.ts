import { CustomError } from "./CustomError";

export class NoContentError extends CustomError {
  constructor(message = "") {
    const customId = message ? `:${message}` : "";
    super(`no-content${customId}`);
  }
}
