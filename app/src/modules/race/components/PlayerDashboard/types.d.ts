import { User } from "firebase/app";

import { Race } from "../../../../types/race";

export interface PlayerDashboardProps {
  /**
   * The race the player is in.
   */
  race: Race;

  /**
   * The user to show the dashboard for.
   */
  user: User;
}
