import React from "react";
import { AuthenticationContextState } from "./types";

/**
 * The Authentication Context provides the user's
 * authentication state and token.
 */
const AuthenticationContext = React.createContext<AuthenticationContextState>({
  userLoaded: false,
  user: null,
  tokenLoaded: false,
  token: null,
  refreshToken: () => {}
});

export default AuthenticationContext;

export { AuthenticationProvider } from "./AuthenticationProvider";
