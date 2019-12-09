import { EventContext } from "firebase-functions";
import { ObjectMetadata } from "firebase-functions/lib/providers/storage";

import { files, store } from "../utils/firebase";
import { Logger } from "../utils/logger";

import { pluralise } from "../utils/text";

/**
 * Handler for when objects are deleted from Firebase storage.
 */
const onDeleteHandler = async (
  object: ObjectMetadata,
  context: EventContext
) => {
  const { name } = object;

  // Check if file already exists
  const ref = await store
    .collection("files")
    .where("path", "==", name)
    .get();

  // Delete each ref that matched
  let count = 0;
  if (!ref.empty) {
    await Promise.all(
      ref.docs.map(async doc => {
        await doc.ref.delete();
        count += 1;
      })
    );
  }

  Logger.info(
    `Deleted ${name} from storage (${count} ${pluralise(
      "match",
      count,
      "matches"
    )}).`,
    { source: "storage" }
  );
};

export const onDelete = files.object().onDelete(onDeleteHandler);
