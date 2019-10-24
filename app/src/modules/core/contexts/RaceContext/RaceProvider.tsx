import React, { FC } from "react";
import { useDocument } from "react-firebase-hooks/firestore";

import { Race } from "../../../../types/race";

import { useFirestore } from "../../hooks/useFirebase";

import RaceContext from ".";
import { RaceProviderProps } from "./types";

/**
 * This component retrieves the data for the given race for the current user.
 */
export const RaceProvider: FC<RaceProviderProps> = ({
  userId,
  raceId,
  children
}) => {
  const store = useFirestore();

  const raceRef = store.collection("races").doc(raceId!);
  const [race, raceLoading] = useDocument(raceRef);
  const [registration, registrationLoading] = useDocument(
    raceRef.collection("registrations").doc(userId)
  );

  return (
    <RaceContext.Provider
      value={{
        loading: raceLoading || registrationLoading,
        registered: registration ? registration.exists : false,
        race: race ? (race.data() as Race) : null
      }}
    >
      {children}
    </RaceContext.Provider>
  );
};
