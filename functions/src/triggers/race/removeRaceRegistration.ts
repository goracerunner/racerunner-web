import * as functions from "firebase-functions";

import { document } from "../../utils/firebase";

import { RaceModel } from "../../models/RaceModel";

/**
 * Update registration count when a registration is removed.
 */
const removeRaceRegistrationHandler = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const { raceId, registrationId } = context.params;
  await RaceModel.removeRegistrationFromRegistrationList(
    raceId,
    registrationId
  );
};

export const removeRaceRegistration = document(
  "races/{raceId}/registrations/{registrationId}"
).onDelete(removeRaceRegistrationHandler);
