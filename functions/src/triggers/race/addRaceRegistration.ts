import * as functions from "firebase-functions";

import { document } from "../../utils/firebase";

import { RaceModel } from "../../models/RaceModel";

/**
 * Update registration count when a registration is added.
 */
const addRaceRegistrationHandler = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const { raceId, registrationId } = context.params;
  await RaceModel.addRegistrationToRegistrationList(raceId, registrationId);
};

export const addRaceRegistration = document(
  "races/{raceId}/registrations/{registrationId}"
).onCreate(addRaceRegistrationHandler);
