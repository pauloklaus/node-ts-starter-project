import { NextFunction, Request, Response } from "express";
import {
  ConnectionError,
  CustomError,
  ForbiddenError,
  GeneralError,
  NoContentError,
  NotFoundError,
  RequiredFieldError,
  ServiceUnavailableError,
  UnauthorizedError,
  UniqueKeyError,
  InvalidFieldError,
} from "@/errors";
import { HttpStatusCode } from "@/enums";
import { LoggerHandler } from "@/infra/logger";

export async function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction
): Promise<void> {
  let errorMessage = error.message;
  const logger = LoggerHandler.getInstance();
  logger.error(request.url, errorMessage);

  if (error instanceof ServiceUnavailableError) {
    response.status(HttpStatusCode.SERVICE_UNAVAILABLE);
  } else if (error instanceof UnauthorizedError) {
    response.status(HttpStatusCode.UNAUTHORIZED);
  } else if (error instanceof ForbiddenError) {
    response.status(HttpStatusCode.FORBIDDEN);
  } else if (error instanceof ConnectionError) {
    errorMessage = "database";
    response.status(HttpStatusCode.SERVER_ERROR);
  } else if (error instanceof CustomError) {
    if (error instanceof NotFoundError) {
      response.status(HttpStatusCode.NOT_FOUND);
    } else if (error instanceof NoContentError) {
      response.status(HttpStatusCode.NO_CONTENT);
    } else if (
      error instanceof GeneralError ||
      error instanceof RequiredFieldError ||
      error instanceof UniqueKeyError ||
      error instanceof InvalidFieldError
    ) {
      response.status(HttpStatusCode.BAD_REQUEST);
    } else {
      response.status(HttpStatusCode.SERVER_ERROR);
    }
  } else {
    errorMessage = "internal";
    response.status(HttpStatusCode.SERVER_ERROR);
  }

  response.json({ error: errorMessage });
}
