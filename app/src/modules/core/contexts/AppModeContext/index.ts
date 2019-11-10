import React from "react";
import { AppModeContextState } from "./types";

/**
 * The AppMode Context provides the current app mode.
 */
const AppModeContext = React.createContext<AppModeContextState>({
  raceId: null,
  setRaceId: () => {}
});

export default AppModeContext;

export { AppModeProvider } from "./AppModeProvider";
