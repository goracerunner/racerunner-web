import { firestore } from "firebase-admin";

import { nodeRef } from "../utils/refs";
import { Logger } from "../utils/logger";
import { pluralise } from "../utils/text";

import { Node } from "../types/node";

/**
 * This class provides a set of convenience methods for modifying
 * known fields and subcollection documents of a Node model.
 */
export class NodeModel {
  public static async getNode(raceId: string, nodeId: string) {
    return (await nodeRef(raceId, nodeId).get()).data() as Node;
  }

  public static async addMembers(
    raceId: string,
    nodeId: string,
    memberIds: string[]
  ) {
    await nodeRef(raceId, nodeId).update({
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
    await nodeRef(raceId, nodeId).update({
      unlockedMembers: firestore.FieldValue.arrayRemove(...memberIds)
    });
    Logger.debug(
      `Removed ${memberIds.length} ${pluralise(
        "member",
        memberIds.length
      )} from <node|${nodeId}>.`
    );
  }

  public static async checkResponse(
    raceId: string,
    nodeId: string,
    responseId: string,
    checked: boolean
  ) {
    await nodeRef(raceId, nodeId)
      .collection("responses")
      .doc(responseId)
      .update({
        checked
      });
    Logger.debug(
      `Marked <response|${responseId}> as ${
        checked ? "checked" : "unchecked"
      } in <node|${nodeId}>`
    );
  }
}
