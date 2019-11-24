import * as functions from "firebase-functions";

import { document } from "../../utils/firebase";

import { UserModel } from "../../models/UserModel";

import { Race } from "../../types/race";

/**
 * Update references when a race is deleted.
 */
const deleteRaceHandler = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const race = snapshot.data() as Race;

  console.info(`Removing race ${race.uid} from users...`);

  // Remove race from participants
  const participants = race.participantIds.map(id =>
    UserModel.removeRaceFromUser(id, race.uid)
  );

  // Remove race from managers
  const managers = race.managerIds.map(id =>
    UserModel.removeManagedRaceFromUser(id, race.uid)
  );

  await Promise.all([...participants, ...managers]);

  console.info(`Removed race from ${participants.length} participants.`);
  console.info(`Removed race from ${managers.length} managers.`);
};

export const onDeleteRace = document("races/{raceId}").onDelete(
  deleteRaceHandler
);
