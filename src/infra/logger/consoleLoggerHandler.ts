import type { Level } from "./Level";
import type { Logger } from "./Logger";

export function consoleLoggerHandler(): Logger {
  const validLevels = ["debug", "info", "warn", "error"];

  let level = "info";
  let username = "anonymous";

  function shouldLog(checkLevel: Level): boolean {
    if (!validLevels.includes(checkLevel)) {
      return false;
    }

    return validLevels.indexOf(checkLevel) >= validLevels.indexOf(level);
  }

  function buildMessage(level: Level, message: string): string {
    return `${new Date().toISOString()} [${level}] (${username}) ${message}`;
  }

  function setLevel(newLevel?: string): void {
    level = newLevel && validLevels.includes(newLevel) ? newLevel : "info";
  }

  function setUser(newUsername: string): void {
    username = newUsername;
  }

  function debug(message: string, payload: unknown = "") {
    if (!shouldLog("debug")) return;
    console.debug(buildMessage("debug", message), payload);
  }

  function info(message: string, payload: unknown = "") {
    if (!shouldLog("info")) return;
    console.info(buildMessage("info", message), payload);
  }

  function warn(message: string, payload: unknown = "") {
    if (!shouldLog("warn")) return;
    console.warn(buildMessage("warn", message), payload);
  }

  function error(message: string, payload: unknown = "") {
    if (!shouldLog("error")) return;
    console.error(buildMessage("error", message), payload);
  }

  return {
    setLevel,
    setUser,
    debug,
    info,
    warn,
    error,
  };
}
