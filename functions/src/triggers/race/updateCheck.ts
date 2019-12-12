import * as functions from "firebase-functions";

import { ResponseCheck } from "../../types/node";

import { document } from "../../utils/firebase";
import { TeamModel } from "../../models/TeamModel";

const updateCheckHandler = async (
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>,
  context: functions.EventContext
) => {
  const { raceId } = context.params;
  const before = change.before.data() as ResponseCheck;
  const after = change.after.data() as ResponseCheck;

  await TeamModel.updatePoints(raceId, after.teamId, -before.points);
  await TeamModel.updatePoints(raceId, after.teamId, after.points);
};

export const updateCheck = document(
  "races/{raceId}/nodes/{nodeId}/checks/{responseId}"
).onUpdate(updateCheckHandler);
