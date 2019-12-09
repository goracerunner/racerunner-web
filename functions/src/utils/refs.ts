import { store } from "../utils/firebase";

export const raceRef = (raceId: string) =>
  store.collection("races").doc(raceId);

export const nodeRef = (raceId: string, nodeId: string) =>
  raceRef(raceId)
    .collection("nodes")
    .doc(nodeId);

export const teamRef = (raceId: string, teamId: string) =>
  raceRef(raceId)
    .collection("teams")
    .doc(teamId);

export const participantRef = (raceId: string, participantId: string) =>
  raceRef(raceId)
    .collection("participants")
    .doc(participantId);

export const userRef = (userId: string) =>
  store.collection("users").doc(userId);
