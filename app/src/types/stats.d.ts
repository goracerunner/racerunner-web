import { firestore } from "firebase/app";

/**
 * A statistic in Firestore.
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
