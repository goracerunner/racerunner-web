import * as admin from "firebase-admin";

import { Logger } from "../utils/logger";
import { raceRef } from "../utils/refs";

import { Race } from "../types/race";
import { UserProfile } from "../types/users";

/**
 * This class provides a set of convenience methods for modifying
 * known fields and subcollection documents of a Race model.
 */
export class RaceModel {
  public static async getRaceData(raceId: string) {
    return (await raceRef(raceId).get()).data() as Race;
  }

  public static async addRegistrationToRegistrationList(
    raceId: string,
    registrationId: string
  ) {
    await raceRef(raceId).update({
      registrationIds: admin.firestore.FieldValue.arrayUnion(registrationId)
    });
    Logger.debug(
      `Added <registration|${registrationId}> to <race|${raceId}> registration list.`
    );
  }

  public static async removeRegistrationFromRegistrationList(
    raceId: string,
    registrationId: string
  ) {
    await raceRef(raceId).update({
      registrationIds: admin.firestore.FieldValue.arrayRemove(registrationId)
    });
    Logger.debug(
      `Removed <registration|${registrationId}> from <race|${raceId}> registration list.`
    );
  }

  public static async addParticipant(raceId: string, userData: UserProfile) {
    await raceRef(raceId)
      .collection("participants")
      .doc(userData.uid)
      .set(userData);
    Logger.info(`Added <user|${userData.uid}> to <race|${raceId}>.`);
  }

  public static async addParticipantToParticipantList(
    raceId: string,
    participantId: string
  ) {
    await raceRef(raceId).update({
      participantIds: admin.firestore.FieldValue.arrayUnion(participantId)
    });
    Logger.debug(
      `Added <participant|${participantId}> to <race|${raceId}> participant list.`
    );
  }

  public static async removeParticipantFromParticipantList(
    raceId: string,
    participantId: string
  ) {
    await raceRef(raceId).update({
      participantIds: admin.firestore.FieldValue.arrayRemove(participantId)
    });
    Logger.debug(
      `Removed <participant|${participantId}> from <race|${raceId}> participant list.`
    );
  }

  public static async addManagerToManagerList(
    raceId: string,
    managerId: string
  ) {
    await raceRef(raceId).update({
      managerIds: admin.firestore.FieldValue.arrayUnion(managerId)
    });
    Logger.debug(
      `Added <manager|${managerId}> to <race|${raceId}> manager list.`
    );
  }

  public static async removeManagerFromManagerList(
    raceId: string,
    managerId: string
  ) {
    await raceRef(raceId).update({
      managerIds: admin.firestore.FieldValue.arrayRemove(managerId)
    });
    Logger.debug(
      `Removed <manager|${managerId}> from <race|${raceId}> manager list.`
    );
  }

  public static async addTeamToTeamList(raceId: string, teamId: string) {
    await raceRef(raceId).update({
      teamIds: admin.firestore.FieldValue.arrayUnion(teamId)
    });
    Logger.debug(`Added <team|${teamId}> to <race|${raceId}> team list.`);
  }

  public static async removeTeamFromTeamList(raceId: string, teamId: string) {
    await raceRef(raceId).update({
      teamIds: admin.firestore.FieldValue.arrayRemove(teamId)
    });
    Logger.debug(`Removed <tema|${teamId}> from <race|${raceId}> team list.`);
  }
}
