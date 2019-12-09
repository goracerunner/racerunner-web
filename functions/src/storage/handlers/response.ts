import { EventContext } from "firebase-functions";
import { ObjectMetadata } from "firebase-functions/lib/providers/storage";

import { UploadHandler } from "./utils";

/**
 * This upload handler captures response files that are
 * created in Storage as records in Firestore.
 */
export const uploadResponse = async (
  object: ObjectMetadata,
  context: EventContext
) => {
  const handler = new UploadHandler({
    noAuthMessage:
      "A race response was created without authorisation context. This was likely done through the Firebase console.",
    fileTypeName: "a race response",
    getDefaultCategory: () => "response",
    getDefaultDescription: () => "A race response."
  });

  await handler.handleUpload(object, context);
};
