import { EventContext } from "firebase-functions";
import { ObjectMetadata } from "firebase-functions/lib/providers/storage";

import { store } from "../../utils/firebase";
import { Logger } from "../../utils/logger";

import {
  FileDataInput,
  FileCategory,
  FileRaceMetadata
} from "../../types/file";

export type ContextAuth =
  | {
      uid: string;
      token: object;
    }
  | undefined;

export interface UploadHandlerOptions {
  /**
   * The message to log when a file is uploaded without authorisation.
   */
  noAuthMessage?: string;

  /**
   * The file type name to use in the success message. This value is
   * used in the default `getSuccessMessage` function, and will be
   * ignored if `getSuccessMessage` is overridden.
   */
  fileTypeName?: string;

  /**
   * A function to generate the success message to log when an
   * upload is successful.
   */
  getSuccessMessage?: (
    auth: ContextAuth,
    exists: boolean,
    name: string,
    id: string
  ) => string;

  /**
   * A function to generate the file name.
   */
  getFileNameFromPath?: (path: string) => string;

  /**
   * A function to generate the category to assign the file.
   */
  getDefaultCategory?: (path: string) => FileCategory;

  /**
   * A function to generate the description to give the file.
   */
  getDefaultDescription?: (path: string) => string;
}

/**
 * This class provides upload handling capabilities.
 */
export class UploadHandler {
  private noAuthMessage: string;
  private getSuccessMessage: (
    auth: ContextAuth,
    exists: boolean,
    name: string,
    id: string
  ) => string;
  private getFileNameFromPath: (path: string) => string;
  private getDefaultCategory: (path: string) => FileCategory;
  private getDefaultDescription: (path: string) => string;

  constructor(options: UploadHandlerOptions) {
    this.noAuthMessage = options.noAuthMessage || "";

    this.getSuccessMessage =
      options.getSuccessMessage ||
      function(auth: ContextAuth, exists: boolean, name: string, id: string) {
        return `${auth ? `<user|${auth.uid}>` : `Admin `} ${
          exists ? "updated" : "created"
        } ${options.fileTypeName || ""} at ${name} (${id}).`;
      };

    this.getFileNameFromPath =
      options.getFileNameFromPath ||
      function(path: string) {
        const nameParts = path.split("/");
        return nameParts[nameParts.length - 1];
      };

    this.getDefaultCategory =
      options.getDefaultCategory ||
      function() {
        return "none";
      };

    this.getDefaultDescription =
      options.getDefaultDescription ||
      function() {
        return "";
      };
  }

  public async handleUpload(
    object: ObjectMetadata,
    context: EventContext,
    raceMeta: FileRaceMetadata = {}
  ) {
    const { auth } = context;

    // Add default as empty string to prevent Firestore errors
    const {
      name = "unknown",
      kind = "",
      bucket = "",
      size = "",
      timeCreated = "",
      updated = ""
    } = object;

    if (!auth) {
      Logger.info(this.noAuthMessage, {
        source: "storage"
      });
    }

    // Generate file id
    let fileId = store.collection("files").doc().id;

    // Get file name
    const fileName = this.getFileNameFromPath(name);

    // Check if file already exists
    const ref = await store
      .collection("files")
      .where("path", "==", name)
      .get();

    const exists = !ref.empty;

    // There should be only one document with this ID if it exists.
    if (exists) {
      fileId = ref.docs[0].id;
    }

    const file: FileDataInput = {
      fileId,
      path: name,
      uploader: auth ? auth.uid : null,
      category: this.getDefaultCategory(name),
      label: fileName,
      name: fileName,
      description: this.getDefaultDescription(name),
      kind,
      bucket,
      size,
      raceMeta,
      timeCreated: new Date(timeCreated),
      updated: new Date(updated)
    };

    // Record uploaded file in Firestore
    await store
      .collection("files")
      .doc(fileId)
      .set(file, { merge: true });

    Logger.info(this.getSuccessMessage(auth, exists, name, fileId), {
      source: "storage"
    });
  }
}
