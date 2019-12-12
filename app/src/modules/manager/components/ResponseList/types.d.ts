import { Race } from "../../../../types/race";
import { Response, Node } from "../../../../types/node";

export interface ResponseListProps {
  /**
   * The type of responses to get.
   */
  type: "checked" | "unchecked";

  /**
   * The race to get responses from.
   */
  race: Race;

  /**
   * Specify the node to get responses from.
   */
  node: Node;
}

export interface ResponsePreviewProps {
  /**
   * The race to get responses from.
   */
  race: Race;

  /**
   * The node the response belongs to.
   */
  node: Node;

  /**
   * The response to display.
   */
  response: Response;
}
