import { isDevelopment } from "./env";

/**
 * Levels supported by debug logger
 */
enum LogLevel {
  debug = "[debug]",
  info = "[info] ",
  warn = "[warn] ",
  error = "[error]"
}

/**
 * Mapping of levels to console output functions
 */
const LevelOutputMap = {
  [LogLevel.debug]: console.log,
  [LogLevel.info]: console.log,
  [LogLevel.warn]: console.warn,
  [LogLevel.error]: console.error
};

/**
 * Styles for outputting to the console
 */
const BODY = "";

/**
 * A utility class that provides methods to print formatted log
 * messages to the console.
 *
 * To make full use of the logging utility to debug with line
 * references, it is recommended that you use Chrome dev tool's
 * **blackboxing**. Add this file as a pattern under Settings >
 * Blackboxing:
 * ```
 * logger\.ts$
 * ```
 *
 * TODO: Add analytics and logging support.
 */
class LoggerUtil {
  private levels: LogLevel[] = [];

  constructor() {
    if (isDevelopment()) {
      this.levels = [
        LogLevel.error,
        LogLevel.warn,
        LogLevel.info,
        LogLevel.debug
      ];
    } else {
      this.levels = [LogLevel.error, LogLevel.warn];
    }
  }

  /**
   * Print a debug level message.
   * @param name name to identify where this message came from
   * @param args things to log
   */
  public debug(name: string, ...args: any[]) {
    this.log(name, LogLevel.debug, args);
  }

  /**
   * Print an info level message.
   * @param name name to identify where this message came from
   * @param args things to log
   */
  public info(name: string, ...args: any[]) {
    this.log(name, LogLevel.info, args);
  }

  /**
   * Print a warn level message.
   * @param name name to identify where this message came from
   * @param args things to log
   */
  public warn(name: string, ...args: any[]) {
    this.log(name, LogLevel.warn, args);
  }

  /**
   * Print an error level message.
   * @param name name to identify where this message came from
   * @param args things to log
   */
  public error(name: string, ...args: any[]) {
    this.log(name, LogLevel.error, args);
  }

  /**
   * Helper function to format and log messages.
   * @param name name to identify where this message came from
   * @param level the level to log the message
   * @param args things to log
   */
  private log(name: string, level: LogLevel, args: any[]) {
    // Check if we should log this level
    if (this.levels.includes(level)) {
      console.group(`${level} ${name}`);
      args.forEach(line => {
        if (typeof line === "object") {
          LevelOutputMap[level](line);
        } else {
          LevelOutputMap[level](`%c${line}`, BODY);
        }
      });
      console.groupEnd();
    }
  }
}

export const Logger = new LoggerUtil();
