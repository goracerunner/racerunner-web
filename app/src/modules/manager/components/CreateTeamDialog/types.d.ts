import { UserProfile } from "../../../../types/users";

export interface CreateTeamDialogProps {
  /**
   * If `true`, the dialog will be shown.
   */
  open: boolean;

  /**
   * Callback to close the dialog.
   */
  onClose: () => void;

  /**
   * The id of the race to create the team for.
   */
  raceId: string;
}
