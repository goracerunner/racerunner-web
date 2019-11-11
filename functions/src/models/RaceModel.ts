import * as admin from "firebase-admin";

import { store } from "../utils/firebase";
import { Race } from "../types/race";

const raceRef = (raceId: string) => store.collection("races").doc(raceId);

/**
 * This class provides a set of convenience methods for modifying
 * known fields and subcollection documents of a Race model.
 */
export class RaceModel {
  public static async getRaceData(raceId: string) {
    return (await raceRef(raceId).get()).data() as Race;
  }

  public static async incrementRegistrations(
    raceId: string,
    increment: 1 | -1
  ) {
    await raceRef(raceId).update({
      registrationCount: admin.firestore.FieldValue.increment(increment)
    });
    console.info(
      `RaceModel: incremented registration count of race (${raceId}) by ${increment}.`
    );
  }

  public static async addParticipantToParticipantList(
    raceId: string,
    participantId: string
  ) {
    await raceRef(raceId).update({
      participantIds: admin.firestore.FieldValue.arrayUnion(participantId)
    });
    console.info(
      `RaceModel: added participant ${participantId} to race (${raceId}) participant list.`
    );
  }

  public static async removeParticipantFromParticipantList(
    raceId: string,
    participantId: string
  ) {
    await raceRef(raceId).update({
      participantIds: admin.firestore.FieldValue.arrayRemove(participantId)
    });
    console.info(
      `RaceModel: removed participant ${participantId} from race (${raceId}) participant list.`
    );
  }

  public static async addManagerToManagerList(
    raceId: string,
    managerId: string
  ) {
    await raceRef(raceId).update({
      managerIds: admin.firestore.FieldValue.arrayUnion(managerId)
    });
    console.info(
      `RaceModel: added manager ${managerId} to race (${raceId}) manager list.`
    );
  }

  public static async removeManagerFromManagerList(
    raceId: string,
    managerId: string
  ) {
    await raceRef(raceId).update({
      managerIds: admin.firestore.FieldValue.arrayRemove(managerId)
    });
    console.info(
      `RaceModel: removed manager ${managerId} from race (${raceId}) manager list.`
    );
  }
}
