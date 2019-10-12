import React, { FC } from "react";
import { Redirect } from "react-router";

import { ProtectedProps } from "./types";
import Authenticated, { AuthenticatedLoader } from "../Authenticated";
import Authorised, { AuthorisedLoader } from "../Authorised";
import LoginFirst from "../LoginFirst";

/**
 * This is a convenience component that combines the functionality
 * of `Authenticated` and `Authorised`.  Child content will be rendered
 * if the user is authenticated and authorised. Otherwise, a login
 * screen/forbidden screen will be shown as appropriate.
 */
export const Protected: FC<ProtectedProps> = ({
  children,
  ...authorisedProps
}) => {
  return (
    <>
      <AuthenticatedLoader />
      <Authenticated inverted>
        <LoginFirst />
      </Authenticated>
      <Authenticated>
        <AuthorisedLoader />
        <Authorised {...authorisedProps}>{children}</Authorised>
        <Authorised {...authorisedProps} inverted>
          <Redirect to="/forbidden" />
        </Authorised>
      </Authenticated>
    </>
  );
};
