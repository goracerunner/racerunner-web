import { RegistrationLocal } from "../RegistrationList/types";

export interface ViewRawRegistrationDialogProps {
  /**
   * Whether this dialog is open or not.
   */
  open: boolean;

  /**
   * Callback to close the dialog.
   */
  onClose: () => void;

  /**
   * The registration to show.
   */
  registration: RegistrationLocal;
}
