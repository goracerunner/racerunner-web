import { NodeSecrets, Node } from "../../../../types/node";

export interface EditNodeSecretsDialogProps {
  /**
   * If `true`, the dialog will be shown.
   */
  open: boolean;

  /**
   * Callback to close the dialog.
   */
  onClose: () => void;

  /**
   * The id of the race to create the node for.
   */
  raceId: string;

  /**
   * The node to edit.
   */
  node: Node;

  /**
   * The current node secrets.
   */
  secrets: NodeSecrets;
}
