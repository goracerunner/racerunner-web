import * as admin from "firebase-admin";

import { Logger } from "../utils/logger";
import { teamRef, participantRef } from "../utils/refs";
import { UserProfile } from "../types/users";
import { Team } from "../types/team";

/**
 * This class provides a set of convenience methods for modifying
 * known fields and subcollection documents of a Team model.
 */
export class TeamModel {
  public static async getTeam(raceId: string, teamId: string) {
    return (await teamRef(raceId, teamId).get()).data() as Team;
  }

  public static async getMembers(raceId: string, teamId: string) {
    return (
      await teamRef(raceId, teamId)
        .collection("members")
        .get()
    ).docs.map(doc => doc.data() as UserProfile);
  }

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
    if ((await teamRef(raceId, teamId).get()).exists) {
      await teamRef(raceId, teamId).update({
        memberIds: admin.firestore.FieldValue.arrayRemove(memberId)
      });
    }
    await participantRef(raceId, memberId).update({
      teamId: admin.firestore.FieldValue.delete()
    });
    Logger.debug(
      `Removed <user|${memberId}> from team <team|${teamId}> member list.`
    );
  }

  public static async removeMembers(raceId: string, teamId: string) {
    console.info("Removing members from race...");

    const members = await this.getMembers(raceId, teamId);

    await Promise.all(
      members.map(async member => {
        // Remove member from collection
        await teamRef(raceId, teamId)
          .collection("members")
          .doc(member.uid)
          .delete();

        Logger.debug(
          `Removed <user|${member.uid}> from team <team|${teamId}>.`
        );
      })
    );

    Logger.debug(`Removed all members from team <team|${teamId}>.`);
  }

  public static async updatePoints(
    raceId: string,
    teamId: string,
    increment: number
  ) {
    console.info(`Updating <team|${teamId}> points by ${increment}...`);
    console.info(raceId, teamId);
    await teamRef(raceId, teamId).update({
      points: admin.firestore.FieldValue.increment(increment)
    });
  }
}
