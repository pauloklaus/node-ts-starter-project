import { CustomError } from "./CustomError";

export class CreateError extends CustomError {
  constructor(message = "") {
    const customId = message ? `:${message}` : "";
    super(`create${customId}`);
  }
}
