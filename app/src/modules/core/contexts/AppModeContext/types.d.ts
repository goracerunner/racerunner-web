import { Nullable } from "../../../../types/global";

export type AppMode = "dashboard" | "race" | "manage";

export interface AppModeContextState {
  /**
   * The mode the app is currently in.
   */
  mode: AppMode;

  /**
   * The currently selected race if there is one.
   */
  raceId: Nullable<string>;

  /**
   * Set the mode of the app.
   */
  setMode: (mode: AppMode) => void;

  /**
   * Set the currently selected race.
   */
  setRaceId: (uid: string) => void;
}
