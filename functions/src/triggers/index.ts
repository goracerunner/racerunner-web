import * as functions from "firebase-functions";

import { createUserHandler, deleteUserHandler } from "./user";
import { updateClaimsHandler } from "./claims";

// Closest region is `asia-northeast1`, but does not allow serving cloud
// functions to be served from the same domain - this is currently only
// available if we use the `us-central1` region :(
const REGION = "us-central1";

// Declare functions

export const onCreateUser = functions
  .region(REGION)
  .auth.user()
  .onCreate(createUserHandler);

export const onDeleteUser = functions
  .region(REGION)
  .auth.user()
  .onDelete(deleteUserHandler);

export const updateClaims = functions
  .region(REGION)
  .firestore.document(`users/{uid}/private/claims`)
  .onWrite(updateClaimsHandler);
