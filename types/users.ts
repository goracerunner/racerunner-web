import { firestore } from "./local";
import { Timestamp } from "./global";

/**
 * A user's profile in Firestore.
 *
 * Document path: `users/{userId}`.
 *
 * Document path: `races/{raceId}/managers/{managerId}`.
 *
 * Document path: `races/{raceId}/participants/{participantId}`.
 *
 * Document path: `races/{raceId}/teams/{teamId}/members/{memberId}`.
 */
export interface UserProfile {
  /**
   * The user's uid.
   */
  uid: string;

  /**
   * The user's full display name.
   */
  name: string;

  /**
   * A URL to the user's profile image.
   */
  photoURL: string;

  /**
   * A list of roles assigned to the user.
   */
  roles?: string[];
}

/**
 * A race participant's profile in Firestore.
 *
 * Document path: `races/{raceId}/participants/{participantId}`.
 */
export interface RaceParticipantProfile extends UserProfile {
  /**
   * The team that the user belongs to.
   */
  teamId?: string;
}

export interface UserProtectedDetailsBase<T extends Timestamp> {
  /**
   * The user's uid.
   */
  uid: string;

  /**
   * The user's email.
   */
  email: string;

  /**
   * The date the user's account was registered.
   */
  registered: T;
}

/**
 * A user's protected details in Firestore.
 *
 * Document path: `users/{uid}/protected/details`.
 */
export interface UserProtectedDetails
  extends UserProtectedDetailsBase<firestore.Timestamp> {}

/**
 * Input for a user's protected details in Firestore.
 *
 * Document path: `users/{uid}/protected/details`.
 */
export interface UserProtectedDetailsInput
  extends UserProtectedDetailsBase<Date> {}

/**
 * Records when and by whom a claim was assigned to a user.
 */
export interface ClaimAssignmentBase<T extends Timestamp> {
  /**
   * The UID of the user who assigned this claim.
   */
  uid: string;

  /**
   * The name of the user who assigned this claim.
   */
  name: string;

  /**
   * The date the claim was assigned.
   */
  date: T;
}

export interface ClaimAssignment
  extends ClaimAssignmentBase<firestore.Timestamp> {}

export interface ClaimAssignmentInput extends ClaimAssignmentBase<Date> {}

/**
 * A user's private claims in Firestore.
 *
 * Document path: `users/{uid}/private/claims`.
 */
export interface UserPrivateClaims {
  [key: string]: ClaimAssignment;
}
