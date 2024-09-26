import pg from "pg";

export interface PostgresConnection {
  pool: pg.Pool;
  client: pg.Client;
}
