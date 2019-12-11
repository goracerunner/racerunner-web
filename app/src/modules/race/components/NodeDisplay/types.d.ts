import { Race } from "../../../../types/race";
import { Team } from "../../../../types/team";

export interface NodeDisplayProps {
  /**
   * The current race.
   */
  race: Race;

  /**
   * The team that the player belongs to.
   */
  team: Team;

  /**
   * The id of the node to display.
   */
  nodeId: string;
}
