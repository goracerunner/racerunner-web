export interface LoginFormProps {
  /**
   * A function used to initiate the login flow.
   */
  startLogin?: (provider: string) => void;
}
