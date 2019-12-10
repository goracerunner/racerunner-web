import { Race } from "../../../../types/race";
import { Node, Task } from "../../../../types/node";

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

export interface TeamPreviewProps {
  /**
   * The node the preview is for.
   */
  node: Node;

  /**
   * The id of the race.
   */
  raceId: string;

  /**
   * The id of the team to show.
   */
  teamId: string;
}

export interface TaskCardProps {
  /**
   * The node the task is in.
   */
  node: Node;

  /**
   * The id of the race.
   */
  raceId: string;

  /**
   * The task to show.
   */
  task: Task;
}
