export interface DbHandler {
  query<R = unknown>(
    query: string,
    values?: Array<string | number | boolean | undefined>,
    sensitiveValues?: number[]
  ): Promise<R[]>;
}
