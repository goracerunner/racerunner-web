import { firestore } from "firebase-admin";

import { store } from "./firebase";

/**
 * Increment the value of a stat
 */
const incrementStat = (statName: string) => async (increment: number) => {
  console.info(
    `stats: ${
      increment < 0 ? "decrementing" : "incrementing"
    } <${statName}> count by ${Math.abs(increment)}`
  );
  await store
    .collection("stats")
    .doc(statName)
    .set(
      {
        value: firestore.FieldValue.increment(increment),
        modified: new Date()
      },
      { merge: true }
    );
};

export const incrementUsers = incrementStat("users");
export const incrementRaces = incrementStat("races");
