import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const firebase = admin.initializeApp();

export default firebase;

export const store = firebase.firestore();
export const auth = firebase.auth();

/**
 * Create a realtime database reference in Firebase.
 * @param path the path to the data in the database.
 */
export const ref = (path: string) => firebase.database().ref(path);

/**
 * Construct a ref and get the value of the data once.
 * @param path the path to teh data in the database.
 */
export const getRef = async <T>(path: string) => {
  return (await ref(path).once("value")).val() as T;
};

/**
 * Validate that a functions context is authenticated with the
 * required claims. If the user is not authenticated or has
 * missing claims, a `HttpsError` will be thrown.
 *
 * @param required the list of required claims
 * @param context the context received from the call
 * @param string the name of the function (for debugging)
 */
export const validateClaims = (
  required: string[],
  context: functions.https.CallableContext,
  name: string
) => {
  if (!context.auth) {
    console.warn(`Unauthenticated user tried to call "${name}"`);
    throw new functions.https.HttpsError("unauthenticated", "Not signed in.");
  }

  const missing = required.filter(claim => !context.auth!.token[claim]);

  if (missing.length > 0) {
    console.warn(
      `User ${
        context.auth.uid
      } tried to call "${name}" but was missing [${missing.join(", ")}]`
    );
    throw new functions.https.HttpsError(
      "permission-denied",
      "User has missing or insufficient permissions."
    );
  }
};
