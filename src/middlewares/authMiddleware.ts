import { NextFunction, Request, Response } from "express";
import { envSettings } from "@/helpers";
import { UnauthorizedError } from "@/errors";
import { decodeAccessToken } from "@/helpers/accessToken";
import { LoggerHandler } from "@/infra/logger";
import { systemCompaniesServiceFactory } from "@/services/SystemCompanies";

export async function authMiddleware(request: Request, response: Response, next: NextFunction) {
  const logger = LoggerHandler.getInstance();

  request.sessionContext = {
    accessToken: request.headers.authorization ?? "",
    username: "",
    name: "",
    companyName: "",
    roles: {
      admin: false,
      settings: false,
    },
  };

  const isApiAccessToken = request.sessionContext.accessToken.toLowerCase().startsWith("bearer");
  const systemCompaniesService = systemCompaniesServiceFactory();

  try {
    const { cookieSessionName } = envSettings();
    const accessTokenFromLocalCookie = request.cookies[`${cookieSessionName}-l`];

    if (!request.sessionContext.accessToken && accessTokenFromLocalCookie) {
      const { jwtSecretKey } = envSettings();
      request.sessionContext = decodeAccessToken(accessTokenFromLocalCookie, jwtSecretKey);
    }

    if (!request.sessionContext.accessToken) {
      throw new UnauthorizedError("invalid-access-token");
    }

    if (!request.sessionContext.companyName) {
      throw new UnauthorizedError("invalid-company");
    }

    const company = await systemCompaniesService.getByName(request.sessionContext.companyName);

    if (company) {
      request.sessionContext = {
        ...request.sessionContext,
        companyName: company.name,
      };
    }

    logger.setUser(request.sessionContext.username);
    logger.info("auth-middleware");
  } catch (error) {
    logger.error(`auth-middleware: ${(error as Error).message}`);

    if (!isApiAccessToken) {
      const { cookieSessionName } = envSettings();
      response.clearCookie(cookieSessionName);
    }

    next(error);
  }

  next();
}
