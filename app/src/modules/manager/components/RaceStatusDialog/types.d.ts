export interface RaceStatusDialogProps {
  /**
   * The id of the race to modify the state for.
   */
  raceId: string;

  /**
   * The status of the race.
   */
  status: string;

  /**
   * If `true`, the dialog will be shown.
   */
  open: boolean;

  /**
   * Callback to close the dialog.
   */
  onClose: () => void;
}
