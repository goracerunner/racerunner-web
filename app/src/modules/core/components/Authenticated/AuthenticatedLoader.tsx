import React from "react";

import Loader from "../../../base/components/Loader";

import { Authenticated } from "./Authenticated";

/**
 * Show a loader when the authentication status is loading.
 */
export const AuthenticatedLoader = () => {
  return (
    <Authenticated loading>
      <Loader message="Authenticating..." />
    </Authenticated>
  );
};
