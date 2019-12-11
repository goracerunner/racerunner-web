import { User } from "firebase/app";

import { Race } from "../../../../types/race";
import { Team } from "../../../../types/team";
import { Node } from "../../../../types/node";

export type NodeFilterType = "new" | "pending" | "completed";

export interface NodesListProps {
  /**
   * The race to show nodes for.
   */
  race: Race;

  /**
   * The team to show nodes for.
   */
  team: Team;

  /**
   * The current user.
   */
  user: User;

  /**
   * The node state to filter by. Leave blank to retrieve nodes in all states.
   */
  state?: NodeFilterType;
}

export interface NodeCardProps {
  /**
   * The race the node is from.
   */
  race: Race;

  /**
   * The node to show.
   */
  node: Node;
}

export interface NodeContainerProps {
  /**
   * The race to show nodes for.
   */
  race: Race;

  /**
   * The team to show nodes for.
   */
  team: Team;

  /**
   * The node to show.
   */
  node: Node;

  /**
   * The node state to filter by. Leave blank to retrieve nodes in all states.
   */
  state?: NodeFilterType;
}
