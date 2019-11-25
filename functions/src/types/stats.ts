import { firestore } from "./local";
import { Timestamp } from "./global";

/**
 * A statistic in Firestore.
 *
 * Document path: `stats/{stat}`.
 */
export interface Stat<T> {
  /**
   * The value of the statistic.
   */
  value: T;

  /**
   * The date the statistic was last modified.
   */
  modified?: firestore.Timestamp;
}

export type LogSource =
  | "function"
  | "app-participant"
  | "app-manager"
  | "app-admin";

export type LogLevel = "debug" | "info" | "warn" | "error";

interface LogMessageBase<T extends Timestamp> {
  /**
   * The date and time of the log message.
   */
  date: T;

  /**
   * The source of the log message.
   */
  source: LogSource;

  /**
   * The severity of the log message.
   */
  level: LogLevel;

  /**
   * The type of log message. This is primarly used to determine
   * how the log message should be displayed visually.
   */
  logType: "message";

  /**
   * The log message.
   */
  message?: string;

  /**
   * Additional information related to the log message.
   */
  data?: object;
}

/**
 * A log message in Firestore.
 *
 * Document path: `logs/{logId}`.
 */
export interface LogMessage extends LogMessageBase<firestore.Timestamp> {}

/**
 * Input for a log message in Firestore.
 *
 * Document path: `logs/{logId}`.
 */
export interface LogMessageInput extends LogMessageBase<Date> {}
