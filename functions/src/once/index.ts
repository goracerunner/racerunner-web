import * as functions from "firebase-functions";

import { addUserRolesHandler } from "./addUserRoles";
import { addRegistrationIdsHandler } from "./addRegistrationIds";

const REGION = "asia-northeast1";

/**
 * These functions are once-off cloud functions written to
 * do bulk updates to certain data models.
 */

export const addUserRoles = functions
  .region(REGION)
  .https.onRequest(addUserRolesHandler);

export const addRegistrationIds = functions
  .region(REGION)
  .https.onRequest(addRegistrationIdsHandler);
