import { Nullable, Timestamp } from "./global";
import { firestore } from "./local";

/**
 * The types of files that are stored in Firebase Storage.
 */
export type FileCategory =
  | "none"
  | "folder"
  | "static"
  | "resource"
  | "response";

export interface FileRaceMetadata {
  /**
   * The race the file is associated with.
   */
  raceId?: string;

  /**
   * The team the file is associated with.
   */
  teamId?: string;

  /**
   * The node the file is associated with.
   */
  nodeId?: string;

  /**
   * The response the file is associated with.
   */
  responseId?: string;
}

export interface FileDataBase<T extends Timestamp> {
  /**
   * The file's ID.
   */
  fileId: string;

  /**
   * The label to give the file. This is to make the file more identifiable
   * for humans in case the file name is not.
   *
   * By default, the name the file was uploaded with is used as the label.
   */
  label: string;

  /**
   * A description for the file.
   */
  description: string;

  /**
   * The path which the file was uploaded to.
   */
  path: string;

  /**
   * The ID of the user who uploaded the file. If the ID is null, the file
   * was likely uploaded through the Firebase console.
   */
  uploader: Nullable<string>;

  /**
   * The category the file belongs in. Used for sorting and filtering.
   */
  category: FileCategory;

  /**
   * The file name.
   */
  name: string;

  /**
   * Extra metadata about the file in relation to races.
   */
  raceMeta: FileRaceMetadata;

  //
  // Firebase Storage properties
  //

  /**
   * The Firebase Storage object type.
   */
  kind: string;

  /**
   * The name of the bucket the file is in.
   */
  bucket: string;

  /**
   * The size of the object in bytes.
   */
  size: string;

  /**
   * The time the file was first uploaded.
   */
  timeCreated: T;

  /**
   * The time the file was last updated.
   */
  updated: T;
}

/**
 * A record of a file uploaded to Firebase Storage.
 *
 * Document Path: `files/{fileId}`.
 */
export interface FileData extends FileDataBase<firestore.Timestamp> {}

/**
 * Input for a record of a file uploaded to Firebase Storage.
 *
 * Document Path: `files/{fileId}`.
 */
export interface FileDataInput extends FileDataBase<Date> {}
