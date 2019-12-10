import { firestore } from "firebase-admin";

import { raceRef } from "../utils/refs";
import { Logger } from "../utils/logger";

import { Node } from "../types/node";
import { pluralise } from "../utils/text";

/**
 * This class provides a set of convenience methods for modifying
 * known fields and subcollection documents of a Node model.
 */
export class NodeModel {
  public static async getNode(raceId: string, nodeId: string) {
    return (
      await raceRef(raceId)
        .collection("nodes")
        .doc(nodeId)
        .get()
    ).data() as Node;
  }

  public static async addMembers(
    raceId: string,
    nodeId: string,
    memberIds: string[]
  ) {
    await raceRef(raceId)
      .collection("nodes")
      .doc(nodeId)
      .update({
        unlockedMembers: firestore.FieldValue.arrayUnion(...memberIds)
      });
    Logger.debug(
      `Added ${memberIds.length} ${pluralise(
        "member",
        memberIds.length
      )} to <node|${nodeId}>.`
    );
  }

  public static async removeMembers(
    raceId: string,
    nodeId: string,
    memberIds: string[]
  ) {
    await raceRef(raceId)
      .collection("nodes")
      .doc(nodeId)
      .update({
        unlockedMembers: firestore.FieldValue.arrayRemove(...memberIds)
      });
    Logger.debug(
      `Removed ${memberIds.length} ${pluralise(
        "member",
        memberIds.length
      )} from <node|${nodeId}>.`
    );
  }
}
