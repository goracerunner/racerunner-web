import * as functions from "firebase-functions";

import { auth } from "../utils/firebase";

/**
 * Update a user's claims in Firebase auth when their claims in
 * Firestore are changed.
 */
export const writeClaimsHandler: (
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>,
  context: functions.EventContext
) => any = async (change, ctx) => {
  const userId = ctx.params.uid;

  // Check that user exists
  try {
    await auth.getUser(userId);
  } catch (error) {
    console.info(`User ${userId} no longer exists, so claims cannot be set.`);
    return;
  }

  // Set the claims
  const claims = change.after.data();
  if (claims) {
    const claimsObject = Object.keys(claims).reduce(
      (obj, key) => ({ ...obj, [key]: true }),
      {}
    );
    await auth.setCustomUserClaims(userId, claimsObject);
    console.info(
      `Claims for user ${userId} set to ${JSON.stringify(claimsObject)}`
    );
  } else {
    await auth.setCustomUserClaims(userId, {});
    console.info(`Claims for user ${userId} removed`);
  }
};
