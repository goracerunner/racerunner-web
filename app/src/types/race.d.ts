import { firestore } from "firebase/app";

import { Timestamp } from "./global";
import { UserProfile } from "./users";

/**
 * The status of a race.
 */
export type RaceStatus =
  | "registration_open"
  | "registration_closed"
  | "in_progress"
  | "closed"
  | "results";

export interface RaceBase<T = Timestamp> {
  /**
   * The uid for the race. This is a name that is used to
   * uniquely identify the race.
   */
  uid: string;

  /**
   * The human-friendly name for the race.
   */
  name: string;

  /**
   * A brief description for the race.
   */
  description: string;

  /**
   * Whether the race has been archived.
   */
  archived: boolean;

  /**
   * The owner of the race.
   */
  owner: UserProfile;

  /**
   * The list of participant ids for the race.
   */
  participantIds: string[];

  /**
   * The list of registration ids fir the race.
   */
  registrationIds: string[];

  /**
   * The list of managers in the race.
   */
  managerIds: string[];

  /**
   * The date of the event.
   */
  eventDate: T;

  /**
   * The status of the race.
   */
  status: RaceStatus;
}

/**
 * A race's details in Firestore.
 * Document path: `races/{uid}`.
 */
export interface Race extends RaceBase<firestore.Timestamp> {}

/**
 * Input for a race's details in Firestore.
 * Document path: `races/{uid}`.
 */
export interface RaceInput extends RaceBase<Date> {}

/**
 * A race's short-hand info.
 */
export interface RaceInfoBase<T extends Timestamp> {
  /**
   * The race's unique identifier.
   */
  uid: string;

  /**
   * The human-friendly version of the name
   */
  name: string;

  /**
   * The race's description.
   */
  description: string;

  /**
   * The date of the race.
   */
  eventDate: T;
}

/**
 * A race's short-hand info.
 * Document path: `users/{uid}/races`.
 * Document path: `users/{uid}/managedRaces`.
 */
export interface RaceInfo extends RaceInfoBase<firestore.Timestamp> {}

/**
 * Input for a race's short-hand info.
 * Document path: `users/{uid}/races`.
 * Document path: `users/{uid}/managedRaces`.
 */
interface RaceInfoInput extends RaceInfoBase<Date> {}

/**
 * A race registration field. These objects are used to populate
 * the registration form for a race.
 * Document path: `races/{uid}/registrationFields`
 */
export interface RaceRegistrationField {
  /**
   * The order of the field.
   */
  order: number;
  /**
   * The name of the field.
   */
  name: string;
  /**
   * The human friendly name for the field.
   */
  label: string;
  /**
   * The description for the field.
   */
  description: string;
  /**
   * The type of field.
   */
  type:
    | "text"
    | "longtext"
    | "number"
    | "list"
    | "listcustom"
    | "select"
    | "checkbox"
    | "markdown";
  /**
   * Whether this field is required.
   */
  required?: boolean;
  /**
   * The placeholder to use for this field.
   */
  placeholder?: string;
  /**
   * The list of values for this field if this is a `list` or `listcustom` field.
   */
  values?: string[];
  /**
   * The default value for this field.
   */
  default?: string;
  /**
   * A macro that will help pre-fill this field from a user's profile.
   */
  prefilled?: string;
  /**
   * Any validation that needs to be applied to this field.
   */
  validation?: RaceRegistrationFieldValidation;
  /**
   * If this is `true`, this field will not be shown on the registration
   * form and can be managed by race managers.
   */
  managersOnly?: boolean;
}

export interface RaceRegistrationFieldValidation {
  /**
   * The type of validation to use.
   */
  type: "value" | "email" | "mobile";
  min?: number;
  max?: number;
}
