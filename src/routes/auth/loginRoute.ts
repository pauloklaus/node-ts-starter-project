import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "@/enums";
import { envSettings } from "@/helpers";
import { LoggerHandler } from "@/infra/logger";
import { generateAccessToken } from "@/helpers/accessToken";
import { systemSessionsServiceFactory } from "@/services/SystemSessions";
import { systemUsersServiceFactory } from "@/services/SystemUsers";

export async function loginRoute(request: Request, response: Response, next: NextFunction) {
  const logger = LoggerHandler.getInstance();

  try {
    const { jwtSecretKey, cookieSessionName, accessTokenExpirationInSec } = envSettings();

    const systemSessionsService = systemSessionsServiceFactory();
    const currentAccessToken = request.cookies[cookieSessionName];

    if (currentAccessToken) {
      await systemSessionsService.destroySessionByToken(currentAccessToken);
      response.clearCookie(cookieSessionName);
    }

    const systemUsersService = systemUsersServiceFactory();

    const { username, password } = request.body;
    const user = await systemUsersService.login(`${username ?? ""}`, `${password ?? ""}`);

    const accessToken = generateAccessToken(
      {
        username: user.username,
        name: user.name,
        company: user.companyName,
        roles: user.roles,
      },
      jwtSecretKey,
      accessTokenExpirationInSec
    );

    const remoteHost = `${
      request.headers["x-forwarded-for"] || request.socket.remoteAddress || ""
    }`;

    const userAgent = `${request.get("User-Agent")}`;

    await systemSessionsService.startSession(user, accessToken, remoteHost, userAgent);

    response.cookie(cookieSessionName, accessToken, {
      maxAge: accessTokenExpirationInSec * 1_000,
      httpOnly: true,
    });

    logger.setUser(username);
    logger.info("login-success");

    response.status(HttpStatusCode.OK).end();
  } catch (error) {
    logger.error(`login-error: ${(error as Error).message}`);
    next(error);
  }
}
