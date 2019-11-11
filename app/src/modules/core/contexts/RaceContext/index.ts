import React from "react";
import { RaceContextState } from "./types";

/**
 * The RaceContext retrieves data for the current user's selected race.
 */
const RaceContext = React.createContext<RaceContextState>({
  loading: false,
  registered: false,
  race: null
});

export default RaceContext;

export { UserRaceProvider } from "./UserRaceProvider";
export { ManagerRaceProvider } from "./ManagerRaceProvider";
