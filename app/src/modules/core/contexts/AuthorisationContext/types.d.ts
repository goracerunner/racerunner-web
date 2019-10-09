export interface AuthorisationContextState {
  /**
   * This value should be `true` once the initial loading of
   * the current authorisation state has completed.
   */
  authorisationLoaded: boolean;

  /**
   * Whether the current user has verified to use this platform.
   */
  verified: boolean;
}
