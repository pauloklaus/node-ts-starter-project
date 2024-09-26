import type { ListOptions } from "@/types";

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

export function getValidListOptions(options: ListOptions): ListOptions {
  const limit = Number(options.limit) || DEFAULT_LIMIT;

  return {
    ...options,
    offset: Number(options.offset) || 0,
    limit: limit > MAX_LIMIT ? MAX_LIMIT : limit,
  };
}
