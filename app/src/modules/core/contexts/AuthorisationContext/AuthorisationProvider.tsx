import React, { FC, useContext, useEffect, useState } from "react";

import { extractClaims } from "../../../../config/claims";

import AuthenticationContext from "../AuthenticationContext";

import AuthorisationContext from ".";

/**
 * This component checks whether the current user has been
 * invited to use this application and their authorisation
 * claims.
 */
export const AuthorisationProvider: FC = ({ children }) => {
  const [authorisationLoaded, setAuthorisationLoaded] = useState(false);
  const [claims, setClaims] = useState<string[]>([]);

  const { user, token } = useContext(AuthenticationContext);

  useEffect(() => {
    async function getAuthorisation() {
      // This will only authorise ONCE.
      // The user must manually refresh the page to retrieve any new authorisation.
      if (user && token && !authorisationLoaded) {
        setClaims(Object.keys(extractClaims(token)));
        setAuthorisationLoaded(true);
        return;
      }
    }
    getAuthorisation();
  });

  return (
    <AuthorisationContext.Provider
      value={{
        authorisationLoaded,
        claims
      }}
    >
      {children}
    </AuthorisationContext.Provider>
  );
};
