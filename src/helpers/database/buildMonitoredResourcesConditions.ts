import { escapeSqlControlChars } from "../escapeSqlControlChars";

export function buildMonitoredResourcesConditions(monitoredResources?: string[]): string {
  if (!monitoredResources || monitoredResources.length === 0) {
    return "";
  }

  const where = [];

  for (const resource of monitoredResources) {
    if (resource !== "") {
      const escapedResource = escapeSqlControlChars(resource);
      where.push(`"resource" ILIKE '%${escapedResource}' OR "user" ILIKE '%${escapedResource}'`);
    }
  }

  return where.length > 0 ? `(${where.join(" OR ")})` : "";
}
