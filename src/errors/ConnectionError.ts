import { CustomError } from "./CustomError";

export class ConnectionError extends CustomError {
  constructor(message = "") {
    const customId = message ? `:${message}` : "";
    super(`connection-error${customId}`);
  }
}
