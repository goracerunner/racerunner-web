import * as functions from "firebase-functions";

import { document } from "../../utils/firebase";

import { RaceModel } from "../../models/RaceModel";

const addTeamHandler = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const { raceId, teamId } = context.params;
  await RaceModel.addTeamToTeamList(raceId, teamId);
};

export const addTeam = document("races/{raceId}/teams/{teamId}").onCreate(
  addTeamHandler
);
