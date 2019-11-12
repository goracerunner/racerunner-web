import { UserProfile } from "../../../../types/users";

export interface RemoveManagerDialogProps {
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

  /**
   * The manager to remove.
   */
  manager: UserProfile;
}
