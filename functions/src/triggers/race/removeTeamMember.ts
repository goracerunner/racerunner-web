import * as functions from "firebase-functions";

import { document } from "../../utils/firebase";

import { TeamModel } from "../../models/TeamModel";

const removeTeamMemberHandler = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const { raceId, teamId, memberId } = context.params;
  await TeamModel.removeMemberFromMemberList(raceId, teamId, memberId);
};

export const removeTeamMember = document(
  "races/{raceId}/teams/{teamId}/members/{memberId}"
).onDelete(removeTeamMemberHandler);
