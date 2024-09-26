import { NextFunction, Request, Response } from "express";
import { ServiceUnavailableError } from "@/errors";
import { LoggerHandler } from "@/infra/logger";

const skipXhr = ["/heartbeat"];

export async function globalMiddleware(request: Request, _: Response, next: NextFunction) {
  const logger = LoggerHandler.getInstance();

  if (!skipXhr.includes(request.path) && !request.xhr && !request.headers.authorization) {
    logger.error("global-middleware: invalid xhr headers");
    next(new ServiceUnavailableError());
    return;
  }

  logger.info("global-middleware");

  next();
}
