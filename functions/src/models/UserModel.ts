import { store } from "../utils/firebase";
import { Race } from "../types/race";

const userRef = (uid: string) => store.collection("users").doc(uid);

/**
 * This class provides a set of convenience methods for modifying
 * known fields and subcollection documents of a User model.
 */
export class UserModel {
  public static async addRaceToUser(uid: string, race: Race) {
    await userRef(uid)
      .collection("races")
      .doc(race.uid)
      .create({
        uid: race.uid,
        name: race.name,
        description: race.description,
        eventData: race.eventDate
      });
    console.info(`UserModel: added race "${race.uid}" to user ${uid}.`);
  }

  public static async addManagedRaceToUser(uid: string, race: Race) {
    await userRef(uid)
      .collection("managedRaces")
      .doc(race.uid)
      .create({
        uid: race.uid,
        name: race.name,
        description: race.description,
        eventData: race.eventDate
      });
    console.info(`UserModel: added managed race "${race.uid}" to user ${uid}.`);
  }

  public static async removeRaceFromUser(uid: string, raceId: string) {
    await userRef(uid)
      .collection("races")
      .doc(raceId)
      .delete();
    console.info(`UserModel: removed race "${raceId}" from user ${uid}.`);
  }

  public static async removeManagedRaceFromUser(uid: string, raceId: string) {
    await userRef(uid)
      .collection("managedRaces")
      .doc(raceId)
      .delete();
    console.info(
      `UserModel: removed managed race "${raceId}" from user ${uid}.`
    );
  }
}
