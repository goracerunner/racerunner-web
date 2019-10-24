import { firestore } from "firebase/app";

type Timestamp = Date | firestore.Timestamp;

type Nullable<T> = T | null;

type Maybe<T> = T | undefined;
