import * as functions from "firebase-functions";

import { document } from "../../utils/firebase";

import { RaceModel } from "../../models/RaceModel";
import { UserModel } from "../../models/UserModel";

import { UserProfile } from "../../types/users";

/**
 * Update references when a participant is removed from a race.
 */
const removeRaceParticipantHandler = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const user = snapshot.data() as UserProfile;
  const { raceId, participantId } = context.params;

  console.info(
    `Removing participant ${participantId} from race <${raceId}>...`
  );

  // Remove from race's list of participants
  await RaceModel.removeParticipantFromParticipantList(raceId, user.uid);

  // Remove race from user
  await UserModel.removeRaceFromUser(user.uid, raceId);

  console.info(
    `Finished removing participant ${participantId} from race <${raceId}>.`
  );
};

export const removeRaceParticipant = document(
  "races/{raceId}/participants/{participantId}"
).onDelete(removeRaceParticipantHandler);
