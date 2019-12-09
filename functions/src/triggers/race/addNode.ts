import * as functions from "firebase-functions";

import { document } from "../../utils/firebase";

import { RaceModel } from "../../models/RaceModel";

const addNodeHandler = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const { raceId, nodeId } = context.params;
  await RaceModel.addNodeToNodeList(raceId, nodeId);
};

export const addNode = document("races/{raceId}/nodes/{nodeId}").onCreate(
  addNodeHandler
);
