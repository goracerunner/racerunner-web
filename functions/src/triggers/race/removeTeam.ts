import * as functions from "firebase-functions";

import { document } from "../../utils/firebase";

import { RaceModel } from "../../models/RaceModel";
import { TeamModel } from "../../models/TeamModel";

const removeTeamHandler = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const { raceId, teamId } = context.params;
  await RaceModel.removeTeamFromTeamList(raceId, teamId);

  // Remove all subcollections
  // TODO:
  await TeamModel.removeMembers(raceId, teamId);
};

export const removeTeam = document("races/{raceId}/teams/{teamId}").onDelete(
  removeTeamHandler
);
