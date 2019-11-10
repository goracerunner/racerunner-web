import { firestore } from "firebase";
import { Timestamp } from "./global";

/**
 * A user's profile in Firestore.
 * Document path: `users/{uid}`.
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
}

/**
 * A user's protected details in Firestore.
 * Document path: `users/{uid}/protected/details`.
 */
export interface UserProtectedDetails {
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
  registered: firestore.Timestamp;
}

/**
 * Records when and by whom a claim was assigned to a user.
 */
interface ClaimAssignmentBase<T extends Timestamp> {
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
 * Document path: `users/{uid}/private/claims`.
 */
export interface UserPrivateClaims {
  [key: string]: ClaimAssignment;
}
