import { postgresInstance } from "@/infra/database";
import { systemSessionsDbRepository } from "./systemSessionsDbRepository";
import { systemSessionsService } from "./systemSessionsService";
import { LoggerHandler } from "@/infra/logger";

export function systemSessionsServiceFactory() {
  const logger = LoggerHandler.getInstance();
  const dbHandler = postgresInstance(logger);
  const repository = systemSessionsDbRepository(dbHandler);
  return systemSessionsService(repository);
}
