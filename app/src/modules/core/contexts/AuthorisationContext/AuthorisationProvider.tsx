import React, { FC, useContext, useEffect, useState } from "react";

import { useFirestore } from "../../hooks/useFirebase";
import AuthenticationContext from "../AuthenticationContext";

import AuthorisationContext from ".";

/**
 * This component checks whether the current user has been
 * invited to use this application and their authorisation
 * claims.
 */
export const AuthorisationProvider: FC = ({ children }) => {
  const store = useFirestore();

  const [authorisationLoaded, setAuthorisationLoaded] = useState(false);
  const [verified, setVerified] = useState(false);

  const { user, token } = useContext(AuthenticationContext);

  useEffect(() => {
    async function getAuthorisation() {
      // This will only authorise ONCE.
      // The user must manually refresh the page to retrieve any new authorisation.
      if (user && token && !authorisationLoaded) {
        // First check if the user has a profile
        try {
          const userProfile = await store
            .collection("users")
            .doc(user.uid)
            .get();
          if (userProfile.exists) {
            setVerified(userProfile.data()!.verified);
          }
        } catch (error) {
          console.warn(error);
        } finally {
          setAuthorisationLoaded(true);
        }
      }
    }
    getAuthorisation();
  });

  return (
    <AuthorisationContext.Provider
      value={{
        authorisationLoaded,
        verified
      }}
    >
      {children}
    </AuthorisationContext.Provider>
  );
};
