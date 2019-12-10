import * as functions from "firebase-functions";

import { Node } from "../../types/node";

import { document } from "../../utils/firebase";
import { TeamModel } from "../../models/TeamModel";
import { NodeModel } from "../../models/NodeModel";

const updateNodeHandler = async (
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>,
  context: functions.EventContext
) => {
  const { raceId, nodeId } = context.params;
  const before = change.before.data() as Node;
  const after = change.after.data() as Node;

  // Calculate difference
  const removedTeams = before.unlockedTeams.filter(
    id => !after.unlockedTeams.includes(id)
  );
  const addedTeams = after.unlockedTeams.filter(
    id => !before.unlockedTeams.includes(id)
  );

  // Remove team members
  if (removedTeams.length) {
    console.info(
      `Removing members from teams [${removedTeams.join(
        ", "
      )}] from node <${nodeId}>...`
    );
    await Promise.all(
      removedTeams.map(async teamId => {
        const teamData = await TeamModel.getTeam(raceId, teamId);
        await NodeModel.removeMembers(raceId, nodeId, teamData.memberIds);
      })
    );
  }

  // Add team members
  if (addedTeams.length) {
    console.info(
      `Addming members from teams [${addedTeams.join(
        ", "
      )}] to node <${nodeId}>...`
    );
    await Promise.all(
      addedTeams.map(async teamId => {
        const teamData = await TeamModel.getTeam(raceId, teamId);
        await NodeModel.addMembers(raceId, nodeId, teamData.memberIds);
      })
    );
  }
};

export const updateNode = document("races/{raceId}/nodes/{nodeId}").onUpdate(
  updateNodeHandler
);
