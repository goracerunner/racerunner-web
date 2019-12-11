import { User } from "firebase/app";

import { Node, NodeMeta, Task } from "../../../../types/node";
import { Team } from "../../../../types/team";

export interface NodeTaskProps {
  /**
   * The current race.
   */
  race: Race;

  /**
   * The team that the player belongs to.
   */
  team: Team;

  /**
   * The node to provide submission for.
   */
  node: Node;

  /**
   * The task in the node.
   */
  task: Task;
}

export interface SubmissionFieldProps {
  /**
   * The current race.
   */
  race: Race;

  /**
   * The task to put a submission for.
   */
  task: Task;

  /**
   * The team that the player belongs to.
   */
  team: Team;
}
