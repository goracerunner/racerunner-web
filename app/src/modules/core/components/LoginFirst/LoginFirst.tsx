import React, { FC } from "react";

import { Logger } from "../../../../utils";
import { LOGIN_REDIRECT } from "../../../../config/storageKey";

import { LoginFirstProps } from "./types";
import { Redirect } from "react-router";

/**
 * This component will save the current path to local storage
 * and redirect the user to the landing page.
 */
export const LoginFirst: FC<LoginFirstProps> = ({ path }) => {
  const { origin, href } = window.location;

  // Save the current location
  const currentPath = href.replace(origin, "");
  Logger.info("LoginFirst", "Saving redirect path", currentPath);
  window.localStorage.setItem(LOGIN_REDIRECT, href.replace(origin, ""));

  return <Redirect to={path || "/"} />;
};
