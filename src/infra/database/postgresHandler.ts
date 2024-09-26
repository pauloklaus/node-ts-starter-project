import { InfrastructureError } from "@/errors";
import type { Logger } from "@/infra/logger";
import type { DbHandler } from "./DbHandler";
import type { PostgresConnection } from "./PostgresConnection";

export function postgresHandler(dbConnection: PostgresConnection, logger: Logger): DbHandler {
  function hideSensitiveValues(
    values?: Array<string | number>,
    sensitiveValuesIndexes?: number[],
  ): Array<string | number> {
    if (!values || values.length === 0) {
      return [];
    }

    if (!sensitiveValuesIndexes || sensitiveValuesIndexes.length === 0) {
      return values;
    }

    return values.map((value: string | number, index: number) => {
      if (sensitiveValuesIndexes.includes(index)) {
        return "***";
      }

      return value;
    });
  }

  async function query<R = unknown>(
    query: string,
    values?: Array<string | number>,
    sensitiveValuesIndexes?: number[],
  ): Promise<R[]> {
    const client = await dbConnection.pool.connect();

    try {
      logger.debug(
        `Running database query "${query}"`,
        hideSensitiveValues(values, sensitiveValuesIndexes),
      );
      const queryResult = await client.query(query, values ?? []);

      return queryResult.rows;
    } catch (error) {
      logger.error((error as Error).message);
      throw new InfrastructureError("db-run-query");
    } finally {
      client.release();
    }
  }

  return {
    query,
  };
}
