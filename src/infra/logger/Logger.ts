export interface Logger {
  setLevel(level?: string): void;
  setUser(username: string): void;
  debug(message: string, payload?: unknown): void;
  info(message: string, payload?: unknown): void;
  warn(message: string, payload?: unknown): void;
  error(message: string, payload?: unknown): void;
}
