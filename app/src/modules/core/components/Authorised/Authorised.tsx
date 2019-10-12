import React, { FC, useContext } from "react";

import { Logger } from "../../../../utils";
import AuthorisationContext from "../../contexts/AuthorisationContext";

import { AuthorisedProps } from "./types";

/**
 * This component will render children based on the authorisation state.
 */
export const Authorised: FC<AuthorisedProps> = ({
  children,
  inverted,
  loading,
  claims: requiredClaims,
  checkType
}) => {
  const { authorisationLoaded, claims } = useContext(AuthorisationContext);

  if (loading && !authorisationLoaded) {
    return <>{children}</>;
  }

  if (!loading && authorisationLoaded) {
    if (requiredClaims) {
      // Look through required claims
      for (let claim of requiredClaims) {
        if (checkType === "and") {
          // If we come across a missing claim, we can stop
          if (!claims.includes(claim)) {
            Logger.info(
              "Component: AccessGuard",
              `Encountered missing claim: ${claim}`
            );
            return inverted ? <>{children}</> : null;
          }
        } else if (checkType === "or") {
          // We found one of the required claims, we can grant access
          if (claims.includes(claim)) {
            return inverted ? null : <>{children}</>;
          }
        }
      }

      // If we reach this stage and the check type is 'and', it means we have all claims
      if (checkType === "and") {
        return inverted ? null : <>{children}</>;
      } else {
        // Otherwise, the 'or' check found no claims.
        Logger.info(
          "Component: AccessGuard",
          `Missing one of these claims: [${requiredClaims.join(", ")}]`
        );
        return inverted ? <>{children}</> : null;
      }
    } else {
      if (!inverted) {
        // Return children if no claims are required
        return <>{children}</>;
      }
    }
  }

  return null;
};

Authorised.defaultProps = {
  checkType: "and"
};
