import React, { FC } from "react";
import { useDocument, useCollectionData } from "react-firebase-hooks/firestore";

import { useFirestore } from "../../hooks/useFirebase";
import { useErrorLogging } from "../../../base/hooks/useLogging";

import { Race } from "../../../../types/race";
import { Team } from "../../../../types/team";

import RaceContext from ".";
import { RaceProviderProps } from "./types";

/**
 * This component retrieves the data for the given race for
 * the current user as a participant.
 */
export const UserRaceProvider: FC<RaceProviderProps> = ({
  userId,
  raceId,
  children
}) => {
  const store = useFirestore();

  const raceRef = store.collection("races").doc(raceId!);
  const [race, raceLoading, raceError] = useDocument(raceRef);
  const [registration, registrationLoading, registrationError] = useDocument(
    raceRef.collection("registrations").doc(userId)
  );
  const [teams, teamsLoading, teamsError] = useCollectionData<Team>(
    raceRef.collection("teams").where("memberIds", "array-contains", userId)
  );

  useErrorLogging(
    "RaceProvider",
    `Failed to load race with id ${raceId}`,
    raceError
  );
  useErrorLogging(
    "RaceProvider",
    `Failed to load registration for user ${userId}`,
    registrationError
  );

  useErrorLogging(
    "RaceProvider",
    `Failed to get team for user ${userId}`,
    teamsError
  );

  return (
    <RaceContext.Provider
      value={{
        loading: raceLoading || registrationLoading || teamsLoading,
        registered: registration ? registration.exists : false,
        race: race ? (race.data() as Race) : null,
        team: teams && teams.length ? teams[0] : null
      }}
    >
      {children}
    </RaceContext.Provider>
  );
};
