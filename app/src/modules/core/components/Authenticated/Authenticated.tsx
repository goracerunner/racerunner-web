import React, { FC, useContext } from "react";

import AuthenticationContext from "../../contexts/AuthenticationContext";

import { AuthenticatedProps } from "./types";

/**
 * This component will render children based on the authentication state.
 */
export const Authenticated: FC<AuthenticatedProps> = ({
  children,
  inverted,
  loading
}) => {
  const { userLoaded, user } = useContext(AuthenticationContext);

  if (loading) {
    if ((inverted && userLoaded) || (!inverted && !userLoaded))
      return <>{children}</>;
  }

  if (!loading && userLoaded) {
    if (!inverted && user) {
      // Return children if not inverted and there is a user
      return <>{children}</>;
    } else if (inverted && !user) {
      // Return children if inverted and there is no user
      return <>{children}</>;
    }
  }

  return null;
};
