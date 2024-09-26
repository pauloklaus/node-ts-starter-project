import pg from "pg";
import { envSettings } from "@/helpers";
import type { Logger } from "@/infra/logger";
import type { PostgresConnection } from "./PostgresConnection";
import type { DbHandler } from "./DbHandler";
import { postgresHandler } from "./postgresHandler";

let pgConnection: PostgresConnection | undefined;

export function postgresInstance(logger: Logger): DbHandler {
  if (!pgConnection) {
    const { dbHost, dbName, dbUser, dbPassword, dbPoolSize } = envSettings();

    pgConnection = {
      pool: new pg.Pool({
        host: dbHost,
        database: dbName,
        user: dbUser,
        password: dbPassword,
        max: dbPoolSize,
        keepAlive: true,
        keepAliveInitialDelayMillis: 60000,
      }),

      client: new pg.Client({
        host: dbHost,
        database: dbName,
        user: dbUser,
        password: dbPassword,
      }),
    };
  }

  return postgresHandler(pgConnection, logger);
}
