import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

import { Maybe } from "../../../types/global";

/**
 * Returns the Firebase Auth instance.
 */
export const useAuth = () => firebase.auth();

/**
 * Returns the Firebase Firestore instance.
 */
export const useFirestore = () => firebase.firestore();

/**
 * Returns the Firebase Functions instance.
 */
export const useFunctions = () => firebase.functions();

/**
 * Returns a HTTPs callable Firebase function with the specified name.
 */
export const useFunction = (functionName: string) =>
  firebase.functions().httpsCallable(functionName);

/**
 * Converts the results returned by a `useCollection` or
 * `useDocument` hook into an object that can be spread
 * as props for the `DataProvider` component.
 */
export const useFirestoreData: <T = any>(
  items: [Maybe<T>, boolean, Maybe<Error>]
) => {
  data: Maybe<T>;
  loading: boolean;
  error: Maybe<Error>;
} = items => {
  const [data, loading, error] = items;
  return { data, loading, error };
};
