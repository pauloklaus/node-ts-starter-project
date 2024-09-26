import { CustomError } from "./CustomError";

export class ServiceUnavailableError extends CustomError {
  constructor(message = "") {
    const customId = message ? `:${message}` : "";
    super(`service-unavailable${customId}`);
  }
}
