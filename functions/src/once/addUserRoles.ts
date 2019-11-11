import * as functions from "firebase-functions";

import { store } from "../utils/firebase";
import { Logger } from "../utils/logger";

import { UserModel } from "../models/UserModel";

import { UserProfile } from "../types/users";

const userRef = (uid: string) => store.collection("users").doc(uid);

/**
 * This function updates the roles array in the user's
 * profile according to their claims.
 */
export const addUserRolesHandler = async (
  req: functions.https.Request,
  resp: functions.Response
) => {
  let count = 0;
  const users = await store.collection("users").get();
  await Promise.all(
    users.docs
      .map(userDoc => userDoc.data() as UserProfile)
      .map(async user => {
        console.log(`Getting claims for user ${user.name} (${user.uid})`);
        const claims = (await userRef(user.uid)
          .collection("private")
          .doc("claims")
          .get()).data();

        await UserModel.setUserClaims(user.uid, claims);
        count += 1;
      })
  );

  Logger.info(
    `AddUserRoles: updated roles for ${count} user${count === 1 ? "" : "s"}.`
  );

  resp.send(`Updated roles for ${count} user${count === 1 ? "" : "s"}.`);
};
