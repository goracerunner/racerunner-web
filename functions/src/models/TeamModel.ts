import * as admin from "firebase-admin";

import { Logger } from "../utils/logger";
import { teamRef, participantRef } from "../utils/refs";

/**
 * This class provides a set of convenience methods for modifying
 * known fields and subcollection documents of a Team model.
 */
export class TeamModel {
  public static async addMemberToMemberList(
    raceId: string,
    teamId: string,
    memberId: string
  ) {
    await teamRef(raceId, teamId).update({
      memberIds: admin.firestore.FieldValue.arrayUnion(memberId)
    });
    await participantRef(raceId, memberId).update({
      teamId
    });
    Logger.debug(
      `Added <user|${memberId}> to team <team|${teamId}> member list.`
    );
  }

  public static async removeMemberFromMemberList(
    raceId: string,
    teamId: string,
    memberId: string
  ) {
    await teamRef(raceId, teamId).update({
      memberIds: admin.firestore.FieldValue.arrayRemove(memberId)
    });
    await participantRef(raceId, memberId).update({
      teamId: admin.firestore.FieldValue.delete()
    });
    Logger.debug(
      `Remove <user|${memberId}> from team <team|${teamId}> member list.`
    );
  }
}
