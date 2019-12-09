import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const firebase = admin.initializeApp();

export default firebase;

export const store = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();
export const config = functions.config;

const REGION = "us-central1";
const LOCAL_REGION = "asia-northeast1";

export const https = functions.region(REGION).https;
export const localHttps = functions.region(LOCAL_REGION).https;
export const users = functions.region(LOCAL_REGION).auth.user();
export const document = functions.region(LOCAL_REGION).firestore.document;
export const pubsub = functions.region(LOCAL_REGION).pubsub;
export const files = functions.region(REGION).storage;

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
