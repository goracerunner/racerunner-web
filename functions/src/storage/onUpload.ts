import { EventContext } from "firebase-functions";
import { ObjectMetadata } from "firebase-functions/lib/providers/storage";

import { files } from "../utils/firebase";
import { Logger } from "../utils/logger";

import { uploadUncategorised } from "./handlers/uncategorised";
import { uploadFolder } from "./handlers/folder";
import { uploadStatic } from "./handlers/static";
import { uploadResource } from "./handlers/resource";
import { uploadResponse } from "./handlers/response";

/**
 * Handler for when objects are uploaded to Firebase storage.
 */
const onFinalizeHandler = async (
  object: ObjectMetadata,
  context: EventContext
) => {
  const { name } = object;

  if (!name) {
    Logger.error("Object uploaded without name");
    return;
  }

  if (name.endsWith("/")) {
    await uploadFolder(object, context);
  } else if (name.startsWith("static/")) {
    await uploadStatic(object, context);
  } else if (name.startsWith("resources/")) {
    await uploadResource(object, context);
  } else if (name.startsWith("responses/")) {
    await uploadResponse(object, context);
  } else {
    await uploadUncategorised(object, context);
  }
};

export const onUpload = files.object().onFinalize(onFinalizeHandler);
