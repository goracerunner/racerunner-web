import * as functions from "firebase-functions";

import { store, users } from "../../utils/firebase";
import { Logger } from "../../utils/logger";
import { incrementUsers } from "../../utils/stats";

import { UserProfile, UserProtectedDetails } from "../../types/users";

/**
 * Create a user profile when a new user logs in to Firebase Auth
 */
const createUserHandler: (
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

export const onCreateUser = users.onCreate(createUserHandler);
