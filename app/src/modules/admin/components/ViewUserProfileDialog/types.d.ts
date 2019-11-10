export interface ViewUserProfileDialogProps {
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
