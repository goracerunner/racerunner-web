import * as functions from "firebase-functions";

import { store, localHttps } from "../utils/firebase";
import { Logger } from "../utils/logger";
import { userRef } from "../utils/refs";

import { Race } from "../types/race";
import { firestore } from "firebase-admin";

/**
 * This function adds each user's races to their custom claims.
 */
const addRacesToClaimsHandler = async (
  req: functions.https.Request,
  resp: functions.Response
) => {
  let userCount = 0;
  let raceCount = 0;

  // Get all races
  const races = (await store.collection("races").get()).docs;
  await Promise.all(
    races.map(async snap => {
      const race = snap.data() as Race;
      raceCount += 1;

      // Add race to each participant
      await Promise.all(
        race.participantIds.map(async id => {
          const ref = userRef(id)
            .collection("private")
            .doc("claims");
          await ref.update({
            races: firestore.FieldValue.arrayRemove(id)
          });
          await ref.update({
            races: firestore.FieldValue.arrayUnion(race.uid)
          });
          userCount += 1;
        })
      );
      // Add race to each manager
      await Promise.all(
        race.managerIds.map(async id => {
          const ref = userRef(id)
            .collection("private")
            .doc("claims");
          await ref.update({
            managedRaces: firestore.FieldValue.arrayRemove(id)
          });
          await ref.update({
            managedRaces: firestore.FieldValue.arrayUnion(race.uid)
          });
          userCount += 1;
        })
      );
    })
  );

  Logger.info(
    `AddRacesToClaimsHandler: updated claims for ${userCount} user${
      userCount === 1 ? "" : "s"
    } in ${raceCount} race${raceCount === 1 ? "" : "s"}.`
  );

  resp.send(
    `Updated ${userCount} user${
      userCount === 1 ? "" : "s"
    } in ${raceCount} race${raceCount === 1 ? "" : "s"}.`
  );
};

export const addRacesToClaims = localHttps.onRequest(addRacesToClaimsHandler);
