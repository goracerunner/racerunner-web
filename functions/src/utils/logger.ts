import { store } from "./firebase";
import { LogMessageInput, LogSource } from "../types/stats";

export enum LogLevel {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error"
}

export enum LogType {
  MESSAGE = "message"
}

export interface LogOptions {
  /**
   * The type of log message.
   * @default "message"
   */
  logType?: LogType;

  /**
   * The source of the log message.
   * @default "function"
   */
  source?: LogSource;

  /**
   * Additional log data to record.
   */
  data?: object;
}

/**
 * Logger utility that logs to the console and also records
 * the log to Firestore (WIP).
 */
export class Logger {
  public static debug(message: string, options?: LogOptions) {
    this.log(LogLevel.DEBUG, message, options);
  }

  public static info(message: string, options?: LogOptions) {
    this.log(LogLevel.INFO, message, options);
  }

  public static warn(message: string, options?: LogOptions) {
    this.log(LogLevel.WARN, message, options);
  }

  public static error(message: string, options?: LogOptions) {
    this.log(LogLevel.ERROR, message, options);
  }

  private static log(
    level: LogLevel,
    message: string,
    options: LogOptions = {}
  ) {
    const { data, logType = "message", source = "function" } = options;

    // Log information to Firestore for auditing purposes.

    const logMessage: LogMessageInput = {
      date: new Date(),
      source,
      level,
      message,
      logType
    };

    if (data) {
      logMessage.data = data;
    }

    store
      .collection("logs")
      .add(logMessage)
      .catch(console.error);

    // Log information to the console

    let logger = console.log;

    switch (level) {
      case LogLevel.WARN: {
        logger = console.warn;
        break;
      }
      case LogLevel.ERROR: {
        logger = console.error;
        break;
      }
    }

    // Log the first message
    logger(`[${level}] ${message}`);

    // Log the data object if there is one
    if (data) logger(data);
  }
}
