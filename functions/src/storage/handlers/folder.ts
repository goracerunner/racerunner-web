import { EventContext } from "firebase-functions";
import { ObjectMetadata } from "firebase-functions/lib/providers/storage";

import { UploadHandler } from "./utils";

/**
 * This upload handler captures folders that are created
 * in Storage as records in Firestore.
 */
export const uploadFolder = async (
  object: ObjectMetadata,
  context: EventContext
) => {
  const handler = new UploadHandler({
    noAuthMessage:
      "A folder was created without authorisation context. This was likely done through the Firebase console.",
    fileTypeName: "folder",
    getFileNameFromPath: (path: string) => {
      const nameParts = path.split("/");
      return nameParts[nameParts.length - 2];
    },
    getDefaultCategory: () => "folder",
    getDefaultDescription: () => "A folder."
  });

  await handler.handleUpload(object, context);
};
