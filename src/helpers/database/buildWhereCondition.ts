export function buildWhereCondition(conditions: string[]): string {
  const whereConditions = [];

  for (const condition of conditions) {
    if (condition.length > 0) {
      whereConditions.push(`${whereConditions.length === 0 ? "WHERE " : " AND "} ${condition}`);
    }
  }

  return whereConditions.join("");
}
