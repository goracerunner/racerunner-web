/**
 * A user's profile in Firestore.
 * Document path: `users/{uid}`.
 */
interface UserProfile {
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
interface UserProtectedDetails {
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
  registered: Date;
}

/**
 * Records when and by whom a claim was assigned to a user.
 */
interface ClaimAssignment {
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
  date: Date;
}

/**
 * A user's private claims in Firestore.
 * Document path: `users/{uid}/private/claims`.
 */
interface UserPrivateClaims {
  [key: string]: ClaimAssignment;
}
