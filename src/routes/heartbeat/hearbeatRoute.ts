import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "@/enums";
import { LoggerHandler } from "@/infra/logger";

export async function heartbeatRoute(_: Request, response: Response, next: NextFunction) {
  const logger = LoggerHandler.getInstance();

  try {
    logger.info("heartbeat");

    response.status(HttpStatusCode.OK).end();
  } catch (error) {
    logger.error((error as Error).message);
    next(error);
  }
}
