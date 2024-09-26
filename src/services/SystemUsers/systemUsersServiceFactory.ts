import { LoggerHandler } from "@/infra/logger";
import { systemUsersDbRepository } from "./systemUsersDbRepository";
import { systemUsersService } from "./systemUsersService";
import { postgresInstance } from "@/infra/database";

export function systemUsersServiceFactory() {
  const logger = LoggerHandler.getInstance();
  const dbHandler = postgresInstance(logger);
  const repository = systemUsersDbRepository(dbHandler, logger);
  return systemUsersService(repository);
}
