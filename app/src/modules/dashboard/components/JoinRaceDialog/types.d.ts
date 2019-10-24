export interface JoinRaceDialogProps {
  /**
   * Whether the join race dialog should be open.
   */
  open: boolean;

  /**
   * Callback function used to close the dialog.
   */
  onClose: () => void;
}
