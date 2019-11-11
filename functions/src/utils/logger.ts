import { store } from "./firebase";
import { LogMessageInput } from "../types/stats";

export enum LogCategory {
  FUNCTIONS = "functions"
}

export enum LogLevel {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error"
}

export enum LogType {
  MESSAGE = "message"
}

/**
 * Logger utility that logs to the console and also records
 * the log to Firestore (WIP).
 */
export class Logger {
  public static debug(message: string, data?: object) {
    this.log(LogLevel.DEBUG, message, data);
  }

  public static info(message: string, data?: object) {
    this.log(LogLevel.INFO, message, data);
  }

  public static warn(message: string, data?: object) {
    this.log(LogLevel.WARN, message, data);
  }

  public static error(message: string, data?: object) {
    this.log(LogLevel.ERROR, message, data);
  }

  private static log(
    level: LogLevel,
    message: string,
    data?: object,
    logType: LogType = LogType.MESSAGE
  ) {
    // Log information to Firestore for auditing purposes.

    const logMessage: LogMessageInput = {
      date: new Date(),
      source: "function",
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
