import { Node } from "../../../../types/node";

export interface AddTaskDialogProps {
  /**
   * If `true`, the dialog will be shown.
   */
  open: boolean;

  /**
   * Callback to close the dialog.
   */
  onClose: () => void;

  /**
   * The id of the race to create the task for.
   */
  raceId: string;

  /**
   * The node to create the task in.
   */
  node: Node;
}
