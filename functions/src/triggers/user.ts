import * as functions from "firebase-functions";

import { store } from "../utils/firebase";
import { Logger } from "../utils/logger";
import { incrementUsers } from "../utils/stats";

import { UserProfile, UserProtectedDetails } from "../types/users";

/**
 * Create a user profile when a new user logs in to Firebase Auth
 */
export const createUserHandler: (
  user: functions.auth.UserRecord,
  context: functions.EventContext
) => any = async (user, ctx) => {
  const userRecord = store.collection("users").doc(user.uid);

  // Check if user record already exists
  // This function shouldn't get triggered here normally
  const userData = await userRecord.get();
  if (userData.exists) {
    Logger.error(`User record already exists for <user|${user.uid}>.`);
    return;
  }
  // Create the user profile add protected/private data

  const userProfile: UserProfile = {
    uid: user.uid,
    name: user.displayName || "unknown",
    photoURL: user.photoURL || "/avatar/unknown.png",
    roles: []
  };

  const userDetails: UserProtectedDetails = {
    uid: user.uid,
    email: user.email || "unknown",
    registered: new Date()
  };

  await userRecord.create(userProfile);
  await incrementUsers(1);

  await userRecord
    .collection("protected")
    .doc("details")
    .create(userDetails);

  await userRecord
    .collection("private")
    .doc("claims")
    .create({
      uid: user.uid
    });

  Logger.info(`Created new <user|${user.uid}>.`);
};

/**
 * Clean up user data when an account is deleted on Firebase Auth
 */
export const deleteUserHandler: (
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
