import * as functions from "firebase-functions";

import { document } from "../../utils/firebase";

import { RaceModel } from "../../models/RaceModel";

const addTaskHandler = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const { raceId, nodeId } = context.params;
  await RaceModel.addTask(raceId, nodeId);
};

export const addTask = document(
  "races/{raceId}/nodes/{nodeId}/tasks/{taskId}"
).onCreate(addTaskHandler);
