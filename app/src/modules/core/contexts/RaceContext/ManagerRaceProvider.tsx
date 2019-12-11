import React, { FC } from "react";
import { useDocument } from "react-firebase-hooks/firestore";

import { Race } from "../../../../types/race";

import { useFirestore } from "../../hooks/useFirebase";
import { Logger } from "../../../../utils";

import RaceContext from ".";
import { RaceProviderProps } from "./types";

/**
 * This component retrieves the data for the given race for
 * the current user as a race manager.
 */
export const ManagerRaceProvider: FC<RaceProviderProps> = ({
  raceId,
  children
}) => {
  const store = useFirestore();

  const raceRef = store.collection("races").doc(raceId!);
  const [race, raceLoading, error] = useDocument(raceRef);

  if (error)
    Logger.error(
      "RaceProvider",
      `Failed to load race with id ${raceId}`,
      error
    );

  return (
    <RaceContext.Provider
      value={{
        loading: raceLoading,
        registered: false,
        race: race ? (race.data() as Race) : null,
        team: null
      }}
    >
      {children}
    </RaceContext.Provider>
  );
};
