import { auth } from "../utils/firebase";
import { Logger } from "../utils/logger";
import { userRef } from "../utils/refs";

import { Race } from "../types/race";
import { firestore } from "firebase-admin";

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
  public static async setUserClaims(
    uid: string,
    claims?: { [key: string]: any }
  ) {
    if (claims) {
      const claimsObject = Object.keys(claims).reduce((obj, key) => {
        if (ROLES.includes(key)) {
          return { ...obj, [key]: true };
        }
        return { ...obj, [key]: claims[key] };
      }, {});
      await auth.setCustomUserClaims(uid, claimsObject);
      await userRef(uid).update({
        roles: Object.keys(claims)
          .filter(c => ROLES.includes(c))
          // Transform the 'uid' claim to 'user'
          .map(c => (c === "uid" ? "user" : c))
      });
      Logger.info(`Set claims for <user|${uid}>.`, claimsObject);
    } else {
      await auth.setCustomUserClaims(uid, {});
      await userRef(uid).update({ roles: [] });
      Logger.info(`Removed claims for <user|${uid}>.`);
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
        eventDate: race.eventDate
      });
    await userRef(uid)
      .collection("private")
      .doc("claims")
      .set(
        { races: firestore.FieldValue.arrayUnion(race.uid) },
        { merge: true }
      );
    Logger.debug(`Added <race|${race.uid}> to <user|${uid}>.`);
  }

  public static async addManagedRaceToUser(uid: string, race: Race) {
    await userRef(uid)
      .collection("managedRaces")
      .doc(race.uid)
      .create({
        uid: race.uid,
        name: race.name,
        description: race.description,
        eventDate: race.eventDate
      });
    await userRef(uid)
      .collection("private")
      .doc("claims")
      .set(
        { managedRaces: firestore.FieldValue.arrayUnion(race.uid) },
        { merge: true }
      );
    Logger.debug(`Added <race|${race.uid}> to <user|${uid}>'s managed races.`);
  }

  public static async removeRaceFromUser(uid: string, raceId: string) {
    await userRef(uid)
      .collection("races")
      .doc(raceId)
      .delete();
    await userRef(uid)
      .collection("private")
      .doc("claims")
      .set(
        { races: firestore.FieldValue.arrayRemove(raceId) },
        { merge: true }
      );
    Logger.debug(`Removed <race|${raceId}> from <user|${uid}>.`);
  }

  public static async removeManagedRaceFromUser(uid: string, raceId: string) {
    await userRef(uid)
      .collection("managedRaces")
      .doc(raceId)
      .delete();
    await userRef(uid)
      .collection("private")
      .doc("claims")
      .set(
        { managedRaces: firestore.FieldValue.arrayRemove(raceId) },
        { merge: true }
      );
    Logger.debug(
      `Removed <race|${raceId}> from <user|${uid}>'s managed races.`
    );
  }
}
