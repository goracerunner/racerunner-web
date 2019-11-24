import * as functions from "firebase-functions";

import { RaceModel } from "../../models/RaceModel";
import { UserModel } from "../../models/UserModel";

import { UserProfile } from "../../types/users";
import { document } from "../../utils/firebase";

/**
 * Update references when a manager is removed from a race.
 */
const removeRaceManagerHandler = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const user = snapshot.data() as UserProfile;
  const { raceId, managerId } = context.params;

  console.info(`Removing manager ${managerId} from race <${raceId}>...`);

  // Remove from race's list of participants
  await RaceModel.removeManagerFromManagerList(raceId, user.uid);

  // Remove race from user
  await UserModel.removeManagedRaceFromUser(user.uid, raceId);

  console.info(`Finished removing manager ${managerId} from race <${raceId}>.`);
};

export const removeRaceManager = document(
  "races/{raceId}/managers/{managerId}"
).onDelete(removeRaceManagerHandler);
