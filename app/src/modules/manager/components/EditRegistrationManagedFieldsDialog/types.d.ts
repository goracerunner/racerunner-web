import { RegistrationLocal } from "../RegistrationList/types";

import { RaceRegistrationField } from "../../../../types/race";

export interface EditRegistrationManagedFieldsDialogProps {
  /**
   * Whether this dialog is open or not.
   */
  open: boolean;

  /**
   * Callback to close the dialog.
   */
  onClose: () => void;

  /**
   * The id of the race we are in.
   */
  raceId: string;

  /**
   * The managed fields in the race's registration form.
   */
  managedFields: Array<RaceRegistrationField>;

  /**
   * The registration to edit.
   */
  registration: RegistrationLocal;
}
