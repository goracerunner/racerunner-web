import { Race } from "../../../../types/race";
import { UserProfile } from "../../../../types/users";
import { Team } from "../../../../types/team";
import { SelectNewTeamMembersProps } from "../SelectNewTeamMembers/types";

export interface TeamProfileProps {
  /**
   * The race that the team is in.
   */
  race: Race;

  /**
   * The id of the team to show.
   */
  teamId: string;
}

export interface RemoveMemberDialogProps {
  /**
   * If `true` the dialog will be shown.
   */
  open: boolean;

  /**
   * The callback function to close the dialog.
   */
  onClose: () => void;

  /**
   * The member to remove.
   */
  member: UserProfile;

  /**
   * The id of the race the member belongs to.
   */
  raceId: string;

  /**
   * The id of the team the member belongs to.
   */
  teamId: string;
}

export interface DeleteTeamDialogProps {
  /**
   * If `true` the dialog will be shown.
   */
  open: boolean;

  /**
   * The callback function to close the dialog.
   */
  onClose: () => void;

  /**
   * The id of the race the member belongs to.
   */
  raceId: string;

  /**
   * The team to delete.
   */
  team: Team;
}

export interface AddMemberDialogProps extends SelectNewTeamMembersProps {
  /**
   * If `true` the dialog will be shown.
   */
  open: boolean;

  /**
   * The id of the race to add members to.
   */
  raceId: string;

  /**
   * The team to add members to.
   */
  team: Team;

  /**
   * The callback function to close the dialog.
   */
  onClose: () => void;

  /**
   * A callback function that can be used to reset selected members.
   */
  setNewMembers: (value: { [key: string]: Nullable<UserProfile> }) => void;
}
