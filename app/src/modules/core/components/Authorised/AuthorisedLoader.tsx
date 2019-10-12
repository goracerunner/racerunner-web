import React from "react";

import Loader from "../../../base/components/Loader";

import { Authorised } from "./Authorised";

/**
 * Show a loader when the authorisation status is loading.
 */
export const AuthorisedLoader = () => {
  return (
    <Authorised loading>
      <Loader message="Authorising..." />
    </Authorised>
  );
};
