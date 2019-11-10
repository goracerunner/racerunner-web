import { store, auth } from "../utils/firebase";
import { Race } from "../types/race";

const userRef = (uid: string) => store.collection("users").doc(uid);

/**
 * A list of recognised roles which can be assigned through a user's claims.
 */
const ROLES = ["uid", "admin", "manager"];

/**
 * This class provides a set of convenience methods for modifying
 * known fields and subcollection documents of a User model.
 */
export class UserModel {
  /**
   * Set a user's auth claims and update their roles on their public profile.
   * @param uid the user's uid
   * @param claims a map containing the claims to give to the user
   */
  public static async setUserClaims(uid: string, claims?: object) {
    if (claims) {
      const claimsObject = Object.keys(claims).reduce(
        (obj, key) => ({ ...obj, [key]: true }),
        {}
      );
      await auth.setCustomUserClaims(uid, claimsObject);
      await userRef(uid).update({
        roles: Object.keys(claims)
          .filter(c => ROLES.includes(c))
          // Transform the 'uid' claim to 'user'
          .map(c => (c === "uid" ? "user" : c))
      });
      console.info(
        `Claims for user ${uid} set to ${JSON.stringify(claimsObject)}`
      );
    } else {
      await auth.setCustomUserClaims(uid, {});
      await userRef(uid).update({ roles: [] });
      console.info(`Claims for user ${uid} removed`);
    }
  }

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
