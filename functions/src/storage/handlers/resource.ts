import { EventContext } from "firebase-functions";
import { ObjectMetadata } from "firebase-functions/lib/providers/storage";

import { UploadHandler } from "./utils";

/**
 * This upload handler captures resource files that are
 * created in Storage as records in Firestore.
 */
export const uploadResource = async (
  object: ObjectMetadata,
  context: EventContext
) => {
  const handler = new UploadHandler({
    noAuthMessage:
      "A race resource was created without authorisation context. This was likely done through the Firebase console.",
    fileTypeName: "a race resource",
    getDefaultCategory: () => "resource",
    getDefaultDescription: () => "A race resource."
  });

  await handler.handleUpload(object, context);
};
