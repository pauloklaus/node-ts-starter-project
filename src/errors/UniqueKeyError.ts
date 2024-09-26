import { CustomError } from "./CustomError";

export class UniqueKeyError extends CustomError {
  constructor(message = "") {
    const customId = message ? `:${message}` : "";
    super(`unique-key${customId}`);
  }
}
