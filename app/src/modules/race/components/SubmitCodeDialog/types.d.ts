export interface SubmitCodeDialogProps {
  /**
   * If `true`, the dialog will be shown.
   */
  open: boolean;

  /**
   * Callback function to close the dialog.
   */
  onClose: () => void;

  /**
   * The id of the race the user is in.
   */
  raceId: string;

  /**
   * The id of the team the user is in.
   */
  teamId: string;
}
