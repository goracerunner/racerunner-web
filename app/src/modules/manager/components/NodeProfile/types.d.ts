import { Race } from "../../../../types/race";

export interface NodeProfileProps {
  /**
   * The race that the node is in.
   */
  race: Race;

  /**
   * The id of the node to show.
   */
  nodeId: string;
}
