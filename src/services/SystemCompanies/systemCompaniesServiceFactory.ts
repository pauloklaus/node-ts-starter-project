import { LoggerHandler } from "@/infra/logger";
import { systemCompaniesDbRepository } from "./systemCompaniesDbRepository";
import { systemCompaniesService } from "./systemCompaniesService";
import { postgresInstance } from "@/infra/database";

export function systemCompaniesServiceFactory() {
  const logger = LoggerHandler.getInstance();
  const dbHandler = postgresInstance(logger);
  const repository = systemCompaniesDbRepository(dbHandler);
  return systemCompaniesService(repository);
}
