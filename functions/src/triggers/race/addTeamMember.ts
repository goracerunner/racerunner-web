import * as functions from "firebase-functions";

import { document } from "../../utils/firebase";

import { TeamModel } from "../../models/TeamModel";

const addTeamMemberHandler = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const { raceId, teamId, memberId } = context.params;
  await TeamModel.addMemberToMemberList(raceId, teamId, memberId);
};

export const addTeamMember = document(
  "races/{raceId}/teams/{teamId}/members/{memberId}"
).onCreate(addTeamMemberHandler);
