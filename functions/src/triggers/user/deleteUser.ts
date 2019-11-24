import * as functions from "firebase-functions";

import { store, users } from "../../utils/firebase";
import { Logger } from "../../utils/logger";
import { incrementUsers } from "../../utils/stats";

/**
 * Clean up user data when an account is deleted on Firebase Auth
 */
const deleteUserHandler: (
  user: functions.auth.UserRecord,
  context: functions.EventContext
) => any = async (user, ctx) => {
  const userRecord = store.collection("users").doc(user.uid);

  // Delete user profile
  // Check if profile exists
  if ((await userRecord.get()).exists) {
    // Need to delete subcollections too!
    // NOTE: current implementation based on the fact that users
    // will NOT have collections more than 1 layer deep.
    const userCollections = await userRecord.listCollections();
    await Promise.all(
      // Iterate through all collections
      userCollections.map(async collection => {
        const docs = await collection.listDocuments();
        // Iterate through all documents
        await Promise.all(docs.map(doc => doc.delete()));
      })
    );

    // Delete the actual profile
    await userRecord.delete();
    await incrementUsers(-1);

    Logger.info(`Created new <user|${user.uid}>.`);
  }
};

export const onDeleteUser = users.onDelete(deleteUserHandler);
