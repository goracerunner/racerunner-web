import * as functions from "firebase-functions";

import { document } from "../../utils/firebase";

import { ResponseCheck } from "../../types/node";

import { NodeModel } from "../../models/NodeModel";
import { TeamModel } from "../../models/TeamModel";

const removeCheckHandler = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const check = snapshot.data() as ResponseCheck;
  const { raceId, nodeId, responseId } = context.params;

  await NodeModel.checkResponse(raceId, nodeId, responseId, false);
  await TeamModel.updatePoints(raceId, check.teamId, -check.points);
};

export const removeCheck = document(
  "races/{raceId}/nodes/{nodeId}/checks/{responseId}"
).onDelete(removeCheckHandler);
