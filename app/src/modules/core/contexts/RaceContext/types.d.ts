import { Nullable } from "../../../../types/global";
import { Race } from "../../../../types/race";
import { Team } from "../../../../types/team";

export interface RaceProviderProps {
  /**
   * The id of the current user.
   */
  userId: string;

  /**
   * The id of the race data to get.
   */
  raceId: string;
}

export interface RaceContextState {
  /**
   * Whether the data has loaded.
   */
  loading: boolean;

  /**
   * The race document retrieved from Firebase.
   */
  race: Nullable<Race>;

  /**
   * The current player's team if they are in a team.
   */
  team: Nullable<Team>;

  /**
   * Whether the user has registered for the race.
   */
  registered: boolean;
}
