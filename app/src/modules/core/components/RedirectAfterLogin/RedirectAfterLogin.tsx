import React, { FC, useState } from "react";
import { Redirect } from "react-router";

import { LOGIN_REDIRECT } from "../../../../config/storageKey";

import { RedirectAfterLoginProps } from "./types";

/**
 * This component is intended to be used right after a login.
 * It will check local storage to see if there is a redirect
 * path to follow; if there is, it will render the redirect
 * path. By default, the redirect will go to `/dashboard`.
 */
export const RedirectAfterLogin: FC<RedirectAfterLoginProps> = () => {
  const [redirect, setRedirect] = useState("/dashboard");

  // Set redirect path and then remove
  const path = window.localStorage.getItem(LOGIN_REDIRECT);
  if (path) {
    setRedirect(path);
    window.localStorage.removeItem(LOGIN_REDIRECT);
  }

  return <Redirect to={redirect} />;
};
