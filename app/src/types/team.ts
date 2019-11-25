import { firestore } from "./local";
import { Timestamp } from "./global";

export interface TeamBase<T extends Timestamp> {
  /**
   * The name of the team.
   */
  name: string;

  /**
   * The date the team was created.
   */
  created: T;

  /**
   * The ids of the membesr in the team.
   */
  memberIds: string[];

  /**
   * The number of points the team has collected.
   */
  points: number;
}

/**
 * A team's details in Firestore.
 *
 * Document path: `races/{raceId}/teams/{teamId}`.
 */
export interface Team extends TeamBase<firestore.Timestamp> {}

/**
 * Input for a team's details in Firestore.
 *
 * Document path: `races/{raceId}/teams/{teamId}`.
 */
export interface TeamInput extends TeamBase<Date> {}
