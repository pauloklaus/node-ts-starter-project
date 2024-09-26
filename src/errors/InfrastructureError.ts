import { CustomError } from "./CustomError";

export class InfrastructureError extends CustomError {
  constructor(message = "") {
    const customId = message ? `:${message}` : "";
    super(`infrastructure${customId}`);
  }
}
