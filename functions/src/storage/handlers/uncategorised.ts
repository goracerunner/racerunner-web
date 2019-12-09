import { EventContext } from "firebase-functions";
import { ObjectMetadata } from "firebase-functions/lib/providers/storage";

import { UploadHandler } from "./utils";

/**
 * This upload handler captures uncategorised files that are
 * created in Storage as records in Firestore.
 */
export const uploadUncategorised = async (
  object: ObjectMetadata,
  context: EventContext
) => {
  const handler = new UploadHandler({
    noAuthMessage:
      "An uncategorised file was created without authorisation context. This was likely done through the Firebase console.",
    fileTypeName: "an uncategorised file",
    getDefaultCategory: () => "none",
    getDefaultDescription: () => ""
  });

  await handler.handleUpload(object, context);
};
