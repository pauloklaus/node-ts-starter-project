import { consoleLoggerHandler } from "./consoleLoggerHandler";
import type { Logger } from "./Logger";

export class LoggerHandler {
  private static instance: Logger;

  private constructor() {}

  public static getInstance(): Logger {
    if (!LoggerHandler.instance) {
      LoggerHandler.instance = consoleLoggerHandler();
    }

    return LoggerHandler.instance;
  }
}
