import { useDocumentData } from "react-firebase-hooks/firestore/";

import { Stat } from "../../../types/stats";

import { useFirestore, useFirestoreData } from "./useFirebase";

/**
 * This hook gets the document data from the stat
 * with the given name. Returns an object containing
 * the `loading`, `error` and `data` props which can
 * be passed to a `DataProvider`.
 * @param name the name of the stat
 */
export const useStat = (name: string) => {
  const store = useFirestore();
  return useFirestoreData<Stat<number>>(
    useDocumentData(store.collection("stats").doc(name))
  );
};
