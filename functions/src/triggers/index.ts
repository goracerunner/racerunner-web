import * as functions from "firebase-functions";

import { createUserHandler, deleteUserHandler } from "./user";
import { writeClaimsHandler } from "./claims";
import {
  addRaceParticipantHandler,
  removeRaceParticipantHandler,
  addRaceManagerHandler,
  removeRaceManagerHandler,
  deleteRaceHandler
} from "./race";

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

export const writeClaims = functions
  .region(REGION)
  .firestore.document(`users/{uid}/private/claims`)
  .onWrite(writeClaimsHandler);

export const addRaceParticipant = functions
  .region(REGION)
  .firestore.document(`races/{raceId}/participants/{participantId}`)
  .onCreate(addRaceParticipantHandler);

export const removeRaceParticipant = functions
  .region(REGION)
  .firestore.document(`races/{raceId}/participants/{participantId}`)
  .onDelete(removeRaceParticipantHandler);

export const addRaceManager = functions
  .region(REGION)
  .firestore.document(`races/{raceId}/managers/{managerId}`)
  .onCreate(addRaceManagerHandler);

export const removeRaceManager = functions
  .region(REGION)
  .firestore.document(`races/{raceId}/managers/{managerId}`)
  .onDelete(removeRaceManagerHandler);

export const onDeleteRace = functions
  .region(REGION)
  .firestore.document(`races/{raceId}`)
  .onDelete(deleteRaceHandler);
