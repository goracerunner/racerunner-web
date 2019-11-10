import { UserProfileLocal } from "../UserList/types";

export interface EditUserRolesDialogProps {
  /**
   * If this is `true`, the dialog will be shown.
   */
  open: boolean;

  /**
   * Handler to close the dialog.
   */
  onClose: () => void;

  /**
   * The user who is currently selected.
   */
  user: UserProfileLocal;
}

export interface RoleSelectorProps {
  /**
   * The user who is currently selected.
   */
  user: UserProfileLocal;
}

export interface RoleSwitchProps {
  /**
   * The label to show beside the switch.
   */
  label: string;

  /**
   * If `true`, the switch will be on.
   */
  checked: boolean;

  /**
   * Callback function for when the switch is toggled.
   */
  onChange: () => void;

  /**
   * The helper text to display below the switch.
   */
  helperText?: string;
}
