import * as functions from "firebase-functions";

import { store, localHttps } from "../utils/firebase";
import { Logger } from "../utils/logger";

import { raceRef } from "../utils/refs";

/**
 * This function adds all registration ids for each
 * race to a list in the top level race document.
 */
const addRegistrationIdListHandler = async (
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

      // Collect all ids
      const registrationIds = await Promise.all(
        registrationDocs.docs.map(async rego => rego.id)
      );

      // Assign ids to race document
      await raceRef(raceId).update({
        registrationIds
      });
      count += 1;
    })
  );

  Logger.info(
    `AddRegistrationIdList: updated registration ids for ${count} race${
      count === 1 ? "" : "s"
    }.`
  );

  resp.send(`Updated ${count} races${count === 1 ? "" : "s"}.`);
};

export const addRegistrationIdList = localHttps.onRequest(
  addRegistrationIdListHandler
);
