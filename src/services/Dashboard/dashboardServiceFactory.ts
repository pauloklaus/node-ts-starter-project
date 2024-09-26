import { postgresInstance } from "@/infra/database";
import { dashboardDbRepository } from "./dashboardDbRepository";
import { dashboardService } from "./dashboardService";
import { LoggerHandler } from "@/infra/logger";

export function dashboardServiceFactory() {
  const logger = LoggerHandler.getInstance();
  const dbHandler = postgresInstance(logger);
  const repository = dashboardDbRepository(dbHandler);
  return dashboardService(repository);
}
