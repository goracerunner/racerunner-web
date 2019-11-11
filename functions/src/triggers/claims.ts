import * as functions from "firebase-functions";

import { auth } from "../utils/firebase";
import { Logger } from "../utils/logger";
import { incrementAdmins, incrementManagers } from "../utils/stats";

import { UserModel } from "../models/UserModel";

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
    Logger.error(
      `<user|${userId} no longer exists so their claims cannot be set.`
    );
    return;
  }

  const prevClaims = change.before.data();
  const claims = change.after.data();

  // Check claims that affect stats
  await checkStatClaim("admin", incrementAdmins)(prevClaims, claims);
  await checkStatClaim("manager", incrementManagers)(prevClaims, claims);

  // Set the claims
  await UserModel.setUserClaims(userId, claims);
};

/**
 * Helper function that takes in a claim name and a callback function used to
 * increment a stat. Returns a function that takes in a before and after object,
 * and compares the two. If the given claim was added, the increment function is
 * called with a `1`. If the given claim was removed, the increment function is
 * called with a `-1`.
 */
const checkStatClaim = (
  claim: string,
  increment: (amount: number) => Promise<void>
) => async (
  before: { [key: string]: object } = {},
  after: { [key: string]: object } = {}
) => {
  // Check if claim has been added
  if (!Boolean(before[claim]) && Boolean(after[claim])) {
    await increment(1);
  }
  // Check if claim has been removed
  else if (Boolean(before[claim] && !Boolean(after[claim]))) {
    await increment(-1);
  }
};
