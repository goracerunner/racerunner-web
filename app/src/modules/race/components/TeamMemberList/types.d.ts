import { User } from "firebase/app";

import { Team } from "../../../../types/team";
import { Race } from "../../../../types/race";

export interface TeamMemberListProps {
  /**
   * The current race.
   */
  race: Race;

  /**
   * The team to show members for.
   */
  team: Team;

  /**
   * The current user.
   */
  user: User;
}
