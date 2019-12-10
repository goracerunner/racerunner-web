import { Team } from "../../../../types/team";
import { Node } from "../../../../types/node";

export interface UnlockTeamDialogProps {
  /**
   * If `true`, the dialog will be shown.
   */
  open: boolean;

  /**
   * Callback function to close the dialog.
   */
  onClose: () => void;

  /**
   * The team the node belongs to.
   */
  raceId: string;

  /**
   * The node that the team should be added to.
   */
  node: Node;
}
