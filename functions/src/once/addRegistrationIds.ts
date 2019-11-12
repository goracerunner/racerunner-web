import * as functions from "firebase-functions";

import { store } from "../utils/firebase";
import { Logger } from "../utils/logger";

const raceRef = (uid: string) => store.collection("races").doc(uid);

/**
 * This function updates each registration document
 * to have its document id as a field in the doc.
 */
export const addRegistrationIdsHandler = async (
  req: functions.https.Request,
  resp: functions.Response
) => {
  let count = 0;

  // Get all races
  const races = await store.collection("races").get();
  const raceIds = races.docs.map(raceDoc => raceDoc.id);

  // Get all registrations
  await Promise.all(
    raceIds.map(async raceId => {
      const registrationDocs = await raceRef(raceId)
        .collection("registrations")
        .get();

      // Add the id to each registration
      await Promise.all(
        registrationDocs.docs.map(async rego => {
          count += 1;
          await rego.ref.update({
            id: rego.id
          });
        })
      );
    })
  );

  Logger.info(
    `AddRegistrationIds: updated ${count} registration${
      count === 1 ? "" : "s"
    }.`
  );

  resp.send(`Updated ${count} registration${count === 1 ? "" : "s"}.`);
};
