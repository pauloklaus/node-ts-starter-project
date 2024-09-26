import { NextFunction, Request, Response } from "express";
import { LoggerHandler } from "@/infra/logger";
import { HttpStatusCode } from "@/enums";
import { envSettings } from "@/helpers";
import { decodeAccessToken } from "@/helpers/accessToken";
import { systemSessionsServiceFactory } from "@/services/SystemSessions";

export async function logoutRoute(request: Request, response: Response, next: NextFunction) {
  const logger = LoggerHandler.getInstance();

  try {
    const { jwtSecretKey, cookieSessionName } = envSettings();

    const accessToken = request.cookies[cookieSessionName];

    const accessTokenFromCookie = request.cookies[cookieSessionName];

    if (accessTokenFromCookie) {
      response.clearCookie(cookieSessionName);

      const systemSessionsService = systemSessionsServiceFactory();
      await systemSessionsService.destroySessionByToken(accessToken);

      const user = decodeAccessToken(accessTokenFromCookie, jwtSecretKey);

      if (user) {
        logger.setUser(user.username);
      }

      logger.info("logout:local");
    }

    response.status(HttpStatusCode.NO_CONTENT).end();
  } catch (error) {
    logger.error(`logout: ${(error as Error).message}`);
    next(error);
  }
}
