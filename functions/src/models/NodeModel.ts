import { raceRef } from "../utils/refs";

import { Node } from "../types/node";

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
}
