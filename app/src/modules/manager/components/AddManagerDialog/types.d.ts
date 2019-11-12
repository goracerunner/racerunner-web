import { Race } from "../../../../types/race";

export interface AddManagerDialogProps {
  /**
   * The race to add a manager to.
   */
  race: Race;

  /**
   * If `true`, the dialog will be shown.
   */
  open: boolean;

  /**
   * Callback function to close the dialog.
   */
  onClose: () => void;
}
