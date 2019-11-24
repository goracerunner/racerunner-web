import * as functions from "firebase-functions";

import { validateClaims, store, https } from "../utils/firebase";
import { Logger } from "../utils/logger";

import { RaceModel } from "../models/RaceModel";

import { UserProfile } from "../types/users";
import { Race } from "../types/race";

/**
 * An authenticated user can call this function to join
 * a race if they know the race's id.
 */
const joinRaceHandler = async (
  data: { raceId?: string },
  context: functions.https.CallableContext
) => {
  // User must be authenticated to call this function
  validateClaims([], context, "joinRace");

  const { raceId } = data;

  if (!raceId) {
    Logger.error("JoinRace failed: no raceId provided.");
    throw new functions.https.HttpsError(
      "invalid-argument",
      "No raceId provided."
    );
  }

  // Check if the race exists
  const raceRecord = await store
    .collection("races")
    .doc(raceId)
    .get();

  if (!raceRecord.exists) {
    Logger.error(
      `JoinRace failed: the requested <race|${raceId}> does not exist.`
    );
    throw new functions.https.HttpsError(
      "not-found",
      `The requested race "${raceId}" does not exist.`
    );
  }

  // Check if the user profile exists
  const userRecord = await store
    .collection("users")
    .doc(context.auth!.uid)
    .get();

  if (!userRecord.exists) {
    Logger.error(
      `JoinRace failed: <user|${context.auth!.uid}> does not exist.`
    );
    throw new functions.https.HttpsError(
      "unauthenticated",
      `The requested user record does not exist.`
    );
  }

  // Get data
  const userData = userRecord.data() as UserProfile;
  const raceData = raceRecord.data() as Race;

  // Check if the race is open for registration
  if (raceData.status !== "registration_open") {
    Logger.warn(
      `JoinRace failed: <race|${raceId}> is not accepting registrations.`
    );
    throw new functions.https.HttpsError(
      "unavailable",
      `Registration is not open for this race.`
    );
  }

  // Check if the user is already in the race
  if (raceData.participantIds.includes(userData.uid)) {
    Logger.warn(
      `JoinRace failed: <user|${userData.uid}> is already in <race|${raceId}>.`
    );
    throw new functions.https.HttpsError(
      "already-exists",
      `You are already in the race "${raceId}".`
    );
  }

  if (raceData.managerIds.includes(userData.uid)) {
    Logger.warn(
      `JoinRace failed: <user|${userData.uid}> is already in <race|${raceId}> as a manager.`
    );
    throw new functions.https.HttpsError(
      "already-exists",
      `You are already in the race "${raceId}".`
    );
  }

  // Add the user to the participants list
  await RaceModel.addParticipant(raceId, userData);

  return raceData;
};

export const joinRace = https.onCall(joinRaceHandler);
