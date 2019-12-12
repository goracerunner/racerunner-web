import { Race } from "../../../../types/race";
import { Team } from "../../../../types/team";
import { NodeMeta, Node, Response } from "../../../../types/node";

export interface CheckResponseDialogProps {
  /**
   * If `true`, the dialog will be shown.
   */
  open: boolean;

  /**
   * Callback to close the dialog.
   */
  onClose: () => void;

  /**
   * The race the response is for.
   */
  race: Race;

  /**
   * The team that submitted the response.
   */
  team: Team;

  /**
   * The node that the response is for.
   */
  node: Node;

  /**
   * The node metadata the response is for.
   */
  meta: NodeMeta;

  /**
   * The response to show.
   */
  response: Response;
}
