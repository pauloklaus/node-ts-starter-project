import { isDomain, isEmail } from "@/helpers/validator";
import { DashboardRepository, DashboardSummaryListOptions } from "./types";
import { InvalidFieldError } from "@/errors";

export function dashboardService(repository: DashboardRepository) {
  function validateResources(resources?: string[]): void {
    if (!resources) {
      return;
    }

    for (const monitoredResource of resources) {
      if (
        !isDomain(monitoredResource) &&
        !isEmail(monitoredResource)
      ) {
        throw new InvalidFieldError("dashboard:summary:resource");
      }
    }
  }

  async function summary(options?: DashboardSummaryListOptions) {
    validateResources(options?.resources);

    return await repository.summary(options);
  }

  return {
    summary,
  };
}
