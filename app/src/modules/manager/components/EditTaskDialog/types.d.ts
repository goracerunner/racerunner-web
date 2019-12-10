import { Node, Task } from "../../../../types/node";

export interface EditTaskDialogProps {
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
   * The task to edit.
   */
  task: Task;
}
