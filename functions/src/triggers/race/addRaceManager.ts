import * as functions from "firebase-functions";

import { document } from "../../utils/firebase";

import { RaceModel } from "../../models/RaceModel";
import { UserModel } from "../../models/UserModel";

import { UserProfile } from "../../types/users";

/**
 * Update references when a manager is added to a race.
 */
const addRaceManagerHandler = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const user = snapshot.data() as UserProfile;
  const { raceId, managerId } = context.params;

  console.info(`Adding manager ${managerId} to race <${raceId}>...`);

  // Add to race's list of managers
  await RaceModel.addManagerToManagerList(raceId, user.uid);

  // Add race to user
  const raceData = await RaceModel.getRaceData(raceId);
  await UserModel.addManagedRaceToUser(user.uid, raceData);

  console.info(`Finished adding manager ${managerId} to race <${raceId}>.`);
};

export const addRaceManager = document(
  "races/{raceId}/managers/{managerId}"
).onCreate(addRaceManagerHandler);
