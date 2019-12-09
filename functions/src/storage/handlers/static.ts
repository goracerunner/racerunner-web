import { EventContext } from "firebase-functions";
import { ObjectMetadata } from "firebase-functions/lib/providers/storage";

import { UploadHandler } from "./utils";

/**
 * This upload handler captures static files that are created
 * in Storage as records in Firestore.
 */
export const uploadStatic = async (
  object: ObjectMetadata,
  context: EventContext
) => {
  const handler = new UploadHandler({
    noAuthMessage:
      "A static file was created without authorisation context. This was likely done through the Firebase console.",
    fileTypeName: "a static file",
    getDefaultCategory: () => "static",
    getDefaultDescription: () => "A static file."
  });

  await handler.handleUpload(object, context);
};
