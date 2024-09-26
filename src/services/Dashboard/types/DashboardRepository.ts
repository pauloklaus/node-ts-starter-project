import { DashboardSummaryListOptions } from ".";
import type { DashboardSummary } from "./";

export interface DashboardRepository {
  summary(options?: DashboardSummaryListOptions): Promise<DashboardSummary>;
}
