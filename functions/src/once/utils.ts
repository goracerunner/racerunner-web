import { store } from "../utils/firebase";

export const raceRef = (uid: string) => store.collection("races").doc(uid);
export const userRef = (uid: string) => store.collection("users").doc(uid);
