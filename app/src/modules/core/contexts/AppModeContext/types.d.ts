import { Nullable } from "../../../../types/global";

export interface AppModeContextState {
  /**
   * The currently selected race if there is one.
   */
  raceId: Nullable<string>;

  /**
   * Set the currently selected race.
   */
  setRaceId: (uid: string) => void;
}
