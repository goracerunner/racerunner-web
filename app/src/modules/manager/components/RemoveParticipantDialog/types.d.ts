import { UserProfile } from "../../../../types/users";

export interface RemoveParticipantDialogProps {
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
   * The participant to remove.
   */
  participant: UserProfile;

  /**
   * A flag to change the prompt on the dialog if the user has already registered.
   */
  registered?: boolean;
}
