import React, { useEffect } from "react";

import Loader from "../../../base/components/Loader";
import { useAuth } from "../../hooks/useFirebase";

/**
 * Signs the user out of the application.
 */
export const LogoutPage: React.FC = () => {
  const auth = useAuth();

  useEffect(() => {
    async function signOut() {
      await auth.signOut();
      window.location.href = "/";
    }
    signOut();
  });

  return <Loader message="Signing out..." />;
};
