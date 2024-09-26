import { NextFunction, Request, Response } from "express";
import { LoggerHandler } from "@/infra/logger";
import { dashboardServiceFactory } from "@/services/Dashboard";

export async function dashboardRoute(request: Request, response: Response, next: NextFunction) {
  const logger = LoggerHandler.getInstance();

  try {
    const resources = request.query["monitored-resources"]
      ? `${request.query["monitored-resources"]}`.split(",")
      : undefined;

    const dashboardService = dashboardServiceFactory();

    const dashboardData = await dashboardService.summary({
      resources,
    });

    logger.info("dashboard.dashboard");

    response.json(dashboardData);
  } catch (error) {
    logger.error(`dashboard.dashboard: ${(error as Error).message}`);
    next(error);
  }
}
