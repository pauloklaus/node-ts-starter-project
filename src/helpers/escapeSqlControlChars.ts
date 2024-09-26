export function escapeSqlControlChars(term: string): string {
  return `${term}`.replaceAll("'", "''").replaceAll("!", "!!").replaceAll("%", "!%");
}
