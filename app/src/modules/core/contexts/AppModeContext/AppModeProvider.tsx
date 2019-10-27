import React, { FC } from "react";

import { RACE_ID } from "../../../../config/storageKey";
import { useLocalStorage } from "../../hooks/useStorage";

import AppModeContext from ".";

/**
 * This component provides the current app mode.
 */
export const AppModeProvider: FC = props => {
  const [raceId, setRaceId] = useLocalStorage(RACE_ID, null);

  return (
    <AppModeContext.Provider
      value={{
        raceId,
        setRaceId
      }}
    >
      {props.children}
    </AppModeContext.Provider>
  );
};
