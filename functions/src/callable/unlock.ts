import * as functions from "firebase-functions";
import { firestore } from "firebase-admin";

import { validateClaims, store, https } from "../utils/firebase";
import { Logger } from "../utils/logger";
import { nodeRef } from "../utils/refs";
import { pluralise } from "../utils/text";

import { NodeSecrets, Node } from "../types/node";
import { UserProfile } from "../types/users";
import { Race } from "../types/race";
import { Team } from "../types/team";

/**
 * An authenticated user can call this function to join
 * a race if they know the race's id.
 */
const unlockHandler = async (
  data: { code?: string; raceId?: string; teamId?: string },
  context: functions.https.CallableContext
) => {
  // User must be authenticated to call this function
  validateClaims([], context, "unlock");

  const { code, raceId, teamId } = data;

  if (!code) {
    Logger.error("Unlock failed: no code provided.");
    throw new functions.https.HttpsError(
      "invalid-argument",
      "No code provided."
    );
  }

  if (!raceId) {
    Logger.error("Unlock failed: no raceId provided.");
    throw new functions.https.HttpsError(
      "invalid-argument",
      "No raceId provided."
    );
  }

  if (!teamId) {
    Logger.error("Unlock failed: no teamId provided.");
    throw new functions.https.HttpsError(
      "invalid-argument",
      "No teamId provided."
    );
  }

  const raceRef = store.collection("races").doc(raceId);

  // Check if the race exists
  const raceRecord = await raceRef.get();

  if (!raceRecord.exists) {
    Logger.error(
      `Unlock failed: the requested <race|${raceId}> does not exist.`
    );
    throw new functions.https.HttpsError(
      "not-found",
      `The requested race "${raceId}" does not exist.`
    );
  }

  // Check if the team exists
  const teamRecord = await raceRef
    .collection("teams")
    .doc(teamId)
    .get();

  if (!teamRecord.exists) {
    Logger.error(`Unlock failed: <team|${teamId}> does not exist.`);
    throw new functions.https.HttpsError(
      "not-found",
      `The requested team record does not exist.`
    );
  }

  // Check if the user profile exists
  const userRecord = await store
    .collection("users")
    .doc(context.auth!.uid)
    .get();

  if (!userRecord.exists) {
    Logger.error(`Unlock failed: <user|${context.auth!.uid}> does not exist.`);
    throw new functions.https.HttpsError(
      "unauthenticated",
      `The requested user record does not exist.`
    );
  }

  // Get data
  const userData = userRecord.data() as UserProfile;
  const raceData = raceRecord.data() as Race;
  const teamData = teamRecord.data() as Team;

  // Check if the race is in progress
  if (raceData.status !== "in_progress") {
    Logger.warn(`Unlock failed: <race|${raceId}> is not in progress.`);
    throw new functions.https.HttpsError(
      "unavailable",
      `Race is not in progress.`
    );
  }

  // Check if the user is in the race
  if (!raceData.participantIds.includes(userData.uid)) {
    Logger.warn(`Unlock failed: <user|${userData.uid}> is not in this race.`);
    throw new functions.https.HttpsError(
      "permission-denied",
      `You are not in the race "${raceId}".`
    );
  }

  // Check if the user is in the specified team
  if (!teamData.memberIds.includes(userData.uid)) {
    Logger.warn(
      `Unlock failed: <user|${userData.uid}> is not in the team ${teamId}.`
    );
    throw new functions.https.HttpsError(
      "permission-denied",
      `You are not in the team "${teamId}".`
    );
  }

  // Look for nodes that have the requested code
  const matches = await store
    .collectionGroup("protected")
    .where("code", "==", code.trim().toLowerCase())
    .get();

  const nodeIds = matches.docs.map(
    match => (match.data() as NodeSecrets).nodeId
  );

  if (nodeIds.length === 0) {
    Logger.debug(
      `<team|${teamId}> tried to unlock a node with code "${code}" in <race|${raceId}> but was unsuccessful.`
    );
    return 0;
  }

  Logger.debug(
    `Code "${code}" matched with ${nodeIds.length} ${pluralise(
      "node",
      nodeIds.length
    )}`
  );

  // Get node data
  const nodes = await Promise.all(
    nodeIds.map(async nodeId => {
      const node = await nodeRef(raceId, nodeId).get();
      return node.data() as Node;
    })
  );

  // Only get protected nodes
  const protectedNodes = nodes.filter(node => node.protected);

  // Only get nodes that have not been unlocked
  const lockedNodes = protectedNodes.filter(
    node => !node.unlockedTeams.includes(teamId)
  );

  // Unlock nodes remaining.
  Logger.debug(
    `<team|${teamId}> unlocked ${lockedNodes.length} ${pluralise(
      "node",
      lockedNodes.length
    )} with code "${code}" in <race|${raceId}>.`
  );
  await Promise.all(
    lockedNodes.map(async node => {
      await nodeRef(raceId, node.nodeId).update({
        unlockedTeams: firestore.FieldValue.arrayUnion(teamId)
      });
    })
  );

  return lockedNodes.length;
};

export const unlock = https.onCall(unlockHandler);
