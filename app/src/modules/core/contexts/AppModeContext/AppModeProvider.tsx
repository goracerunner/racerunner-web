import React, { FC } from "react";

import { APP_MODE, RACE_ID } from "../../../../config/storageKey";
import { useLocalStorage } from "../../hooks/useStorage";

import AppModeContext from ".";
import { AppMode } from "./types";

/**
 * This component provides the current app mode.
 */
export const AppModeProvider: FC = props => {
  const [mode, setMode] = useLocalStorage(APP_MODE, "dashboard");
  const [raceId, setRaceId] = useLocalStorage(RACE_ID, null);

  return (
    <AppModeContext.Provider
      value={{
        mode: mode as AppMode,
        setMode,
        raceId,
        setRaceId
      }}
    >
      {props.children}
    </AppModeContext.Provider>
  );
};
