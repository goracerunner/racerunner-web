export interface AuthorisationContextState {
  /**
   * This value should be `true` once the initial loading of
   * the current authorisation state has completed.
   */
  authorisationLoaded: boolean;

  /**
   * A list of claims that the user has.
   */
  claims: string[];
}
