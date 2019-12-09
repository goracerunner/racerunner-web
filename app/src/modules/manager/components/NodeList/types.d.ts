import { Node } from "../../../../types/node";

export interface NodeListProps {
  /**
   * The id of the race to show nodes for.
   */
  raceId: string;

  /**
   * A callback function for when the add node button is clicked.
   */
  onAddNode: () => void;
}

export interface NodePreviewProps {
  /**
   * The id of the race the node is from.
   */
  raceId: string;

  /**
   * The node to show.
   */
  node: Node;
}
