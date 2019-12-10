import * as functions from "firebase-functions";

import { document } from "../../utils/firebase";

import { RaceModel } from "../../models/RaceModel";

const removeTaskHandler = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const { raceId, nodeId } = context.params;
  await RaceModel.removeTask(raceId, nodeId);
};

export const removeTask = document(
  "races/{raceId}/nodes/{nodeId}/tasks/{taskId}"
).onDelete(removeTaskHandler);
