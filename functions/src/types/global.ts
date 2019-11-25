import { firestore } from "./local";

export type Timestamp = Date | firestore.Timestamp;

export type Nullable<T> = T | null;

export type Maybe<T> = T | undefined;
