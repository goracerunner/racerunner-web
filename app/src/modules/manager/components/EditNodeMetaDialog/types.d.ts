import { Node, NodeMeta } from "../../../../types/node";

export interface EditNodeMetaDialogProps {
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
   * The current node meta.
   */
  meta: NodeMeta;
}
