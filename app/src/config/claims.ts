import firebase from "firebase/app";

import { Nullable } from "../types/global";

const RECOGNISED_CLAIMS = ["admin", "manager"];

/**
 * Extract the values of all recognised claims from an Id token.
 */
export const extractClaims = (token: Nullable<firebase.auth.IdTokenResult>) => {
  // Collector for recognised claims
  const claims: { [key: string]: boolean } = {};

  // If the token is empty, return an empty object
  if (!token) return claims;

  // Iterate through all claim properties
  for (let key of Object.keys(token.claims)) {
    if (RECOGNISED_CLAIMS.includes(key)) {
      claims[key] = token.claims[key];
    }
  }

  // Return the claims that were recognised
  return claims;
};
