import React from "react";
import { AuthorisationContextState } from "./types";

/**
 * The Authorisation Context provides the user's
 * authorisation status.
 */
const AuthorisationContext = React.createContext<AuthorisationContextState>({
  authorisationLoaded: false,
  verified: false
});

export default AuthorisationContext;

export { AuthorisationProvider } from "./AuthorisationProvider";
