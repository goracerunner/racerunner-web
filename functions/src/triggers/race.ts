import * as functions from "firebase-functions";

import { RaceModel } from "../models/RaceModel";
import { UserModel } from "../models/UserModel";

import { UserProfile } from "../types/users";
import { Race } from "../types/race";

/**
 * Update references when a race is deleted.
 */
export const deleteRaceHandler = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const race = snapshot.data() as Race;

  console.info(`Removing race ${race.uid} from users...`);

  // Remove race from participants
  const participants = race.participantIds.map(id =>
    UserModel.removeRaceFromUser(id, race.uid)
  );

  // Remove race from managers
  const managers = race.managerIds.map(id =>
    UserModel.removeManagedRaceFromUser(id, race.uid)
  );

  await Promise.all([...participants, ...managers]);

  console.info(`Removed race from ${participants.length} participants.`);
  console.info(`Removed race from ${managers.length} managers.`);
};

/**
 * Update references when a participant is added to a race.
 */
export const addRaceParticipantHandler = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const user = snapshot.data() as UserProfile;
  const { raceId, participantId } = context.params;

  console.info(`Adding participant ${participantId} to race <${raceId}>...`);

  // Add to race's list of participants
  await RaceModel.addParticipantToParticipantList(raceId, user.uid);

  // Add race to user
  const raceData = await RaceModel.getRaceData(raceId);
  await UserModel.addRaceToUser(user.uid, raceData);

  console.info(
    `Finished adding participant ${participantId} to race <${raceId}>.`
  );
};

/**
 * Update references when a participant is removed from a race.
 */
export const removeRaceParticipantHandler = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const user = snapshot.data() as UserProfile;
  const { raceId, participantId } = context.params;

  console.info(
    `Removing participant ${participantId} from race <${raceId}>...`
  );

  // Remove from race's list of participants
  await RaceModel.removeParticipantFromParticipantList(raceId, user.uid);

  // Remove race from user
  await UserModel.removeRaceFromUser(user.uid, raceId);

  console.info(
    `Finished removing participant ${participantId} from race <${raceId}>.`
  );
};

/**
 * Update references when a manager is added to a race.
 */
export const addRaceManagerHandler = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const user = snapshot.data() as UserProfile;
  const { raceId, managerId } = context.params;

  console.info(`Adding manager ${managerId} to race <${raceId}>...`);

  // Add to race's list of managers
  await RaceModel.addManagerToManagerList(raceId, user.uid);

  // Add race to user
  const raceData = await RaceModel.getRaceData(raceId);
  await UserModel.addManagedRaceToUser(user.uid, raceData);

  console.info(`Finished adding manager ${managerId} to race <${raceId}>.`);
};

/**
 * Update references when a manager is removed from a race.
 */
export const removeRaceManagerHandler = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const user = snapshot.data() as UserProfile;
  const { raceId, managerId } = context.params;

  console.info(`Removing manager ${managerId} from race <${raceId}>...`);

  // Remove from race's list of participants
  await RaceModel.removeManagerFromManagerList(raceId, user.uid);

  // Remove race from user
  await UserModel.removeManagedRaceFromUser(user.uid, raceId);

  console.info(`Finished removing manager ${managerId} from race <${raceId}>.`);
};

/**
 * Update registration count when a registration is added.
 */
export const addRaceRegistrationHandler = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const { raceId } = context.params;
  await RaceModel.incrementRegistrations(raceId, 1);
};

/**
 * Update registration count when a registration is removed.
 */
export const removeRaceRegistrationHandler = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const { raceId } = context.params;
  await RaceModel.incrementRegistrations(raceId, -1);
};
