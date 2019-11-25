import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { store, localHttps } from "../utils/firebase";
import { Logger } from "../utils/logger";

import { UserProfile } from "../types/users";
import { firestore } from "../types/local";

import { userRef } from "../utils/refs";

/**
 * This function renames the eventData field in a
 * user's race to eventDate (due to a typo).
 */
const renameEventDateHandler = async (
  req: functions.https.Request,
  resp: functions.Response
) => {
  let count = 0;
  const users = await store.collection("users").get();
  await Promise.all(
    users.docs
      .map(userDoc => userDoc.data() as UserProfile)
      .map(async user => {
        console.log(`Getting races for user ${user.name} (${user.uid})`);

        const races = await userRef(user.uid)
          .collection("races")
          .get();

        await Promise.all(
          races.docs.map(async raceDoc => {
            await raceDoc.ref.update({
              eventDate: (raceDoc.data()
                .eventData as firestore.Timestamp).toDate(),
              eventData: admin.firestore.FieldValue.delete()
            });
            count += 1;
          })
        );
      })
  );

  Logger.info(
    `RenameEventdate: updated eventDate field for ${count} race${
      count === 1 ? "" : "s"
    }.`
  );

  resp.send(
    `Updated eventDate field for ${count} race${count === 1 ? "" : "s"}.`
  );
};

export const renameEventDate = localHttps.onRequest(renameEventDateHandler);
