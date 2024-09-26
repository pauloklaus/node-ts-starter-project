import { NextFunction, Request, Response } from "express";
import { LoggerHandler } from "@/infra/logger";

export async function infoRoute(request: Request, response: Response, next: NextFunction) {
  const logger = LoggerHandler.getInstance();

  try {
    response.json({
      username: request.sessionContext.username,
      name: request.sessionContext.name,
      company: {
        name: request.sessionContext.companyName,
      },
      roles: [
        ...(request.sessionContext.roles.admin ? ["admin"] : []),
        ...(request.sessionContext.roles.settings ? ["settings"] : []),
      ],
    });

    logger.info("info-success");
  } catch (error) {
    logger.error(`info-error: ${(error as Error).message}`);
    next(error);
  }
}
