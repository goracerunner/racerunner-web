import * as functions from "firebase-functions";

import { joinRaceHandler } from "./race";

// Closest region is `asia-northeast1`, but does not allow serving cloud
// functions to be served from the same domain - this is currently only
// available if we use the `us-central1` region :(
const REGION = "us-central1";

// Declare functions

export const joinRace = functions.region(REGION).https.onCall(joinRaceHandler);
