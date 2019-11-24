import * as functions from "firebase-functions";

import { document } from "../../utils/firebase";

import { RaceModel } from "../../models/RaceModel";
import { UserModel } from "../../models/UserModel";

import { UserProfile } from "../../types/users";

/**
 * Update references when a participant is added to a race.
 */
const addRaceParticipantHandler = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const user = snapshot.data() as UserProfile;
  const { raceId, participantId } = context.params;

  console.info(`Adding participant ${participantId} to race <${raceId}>...`);

  // Add to race's list of participants
  await RaceModel.addParticipantToParticipantList(raceId, user.uid);

  // Add race to user
  const raceData = await RaceModel.getRaceData(raceId);
  await UserModel.addRaceToUser(user.uid, raceData);

  console.info(
    `Finished adding participant ${participantId} to race <${raceId}>.`
  );
};

export const addRaceParticipant = document(
  "races/{raceId}/participants/{participantId}"
).onCreate(addRaceParticipantHandler);
