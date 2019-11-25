import { store } from "../utils/firebase";

export const raceRef = (raceId: string) =>
  store.collection("races").doc(raceId);

export const teamRef = (raceId: string, teamId: string) =>
  raceRef(raceId)
    .collection("teams")
    .doc(teamId);

export const userRef = (userId: string) =>
  store.collection("users").doc(userId);
