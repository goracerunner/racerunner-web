import React, { FC, useContext, useEffect, useState } from "react";

import AuthenticationContext from "../AuthenticationContext";

import AuthorisationContext from ".";

/**
 * This component checks whether the current user has been
 * invited to use this application and their authorisation
 * claims.
 */
export const AuthorisationProvider: FC = ({ children }) => {
  const [authorisationLoaded, setAuthorisationLoaded] = useState(false);

  const { user, token } = useContext(AuthenticationContext);

  useEffect(() => {
    async function getAuthorisation() {
      // This will only authorise ONCE.
      // The user must manually refresh the page to retrieve any new authorisation.
      if (user && token && !authorisationLoaded) {
        // TODO: implement permissions and claims checking
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
        claims: [] // TODO: implement this
      }}
    >
      {children}
    </AuthorisationContext.Provider>
  );
};
