import { OrderBy } from ".";

export interface ListOptions {
  download?: boolean;
  offset?: number;
  limit?: number;
  term?: string;
  orderBy?: OrderBy[];
}
