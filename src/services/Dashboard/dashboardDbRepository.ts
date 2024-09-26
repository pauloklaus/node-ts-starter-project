import type { DbHandler } from "@/infra/database";
import type {
  DashboardSummary,
  DashboardRepository,
  DashboardSummaryListOptions,
  Count,
} from "./types";
import {
  buildMonitoredResourcesConditions,
  buildWhereCondition,
} from "@/helpers/database";

export function dashboardDbRepository(dbHandler: DbHandler): DashboardRepository {
  const passwordsTable = "passwords";

  async function summary(options?: DashboardSummaryListOptions): Promise<DashboardSummary> {
    const monitoredResourcesConditions = buildMonitoredResourcesConditions(options?.resources);

    const conditions = [monitoredResourcesConditions];

    const validResponse = await dbHandler.query<Count>(
      `SELECT COUNT(*) as "count" FROM ${passwordsTable} ${buildWhereCondition([...conditions, "validation='v'"])}`,
    );

    const invalidResponse = await dbHandler.query<Count>(
      `SELECT COUNT(*) as "count" FROM ${passwordsTable} ${buildWhereCondition([...conditions, "validation='i'"])}`,
    );

    const pendingResponse = await dbHandler.query<Count>(
      `SELECT COUNT(*) as "count" FROM ${passwordsTable} ${buildWhereCondition([...conditions, "validation='p'"])}`,
    );

    return {
      valid: Number(validResponse[0].count),
      invalid: Number(invalidResponse[0].count),
      pending: Number(pendingResponse[0].count),
    };
  }

  return {
    summary,
  };
}
