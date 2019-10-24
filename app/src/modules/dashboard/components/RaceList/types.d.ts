import { User } from "firebase/app";
import { RaceInfo } from "../../../../types/race";

export interface RaceListProps {
  /**
   * The current user.
   */
  user: User;

  /**
   * List races that the user is managing.
   */
  viewManaging?: boolean;

  /**
   * If `true`, the "Join a race" button will be shown at the bottom of the list.
   */
  showJoinRace?: boolean;

  /**
   * Callback function for when the user clicks the join a race button.
   */
  onJoinRace?: () => void;
}

export interface RaceCardProps {
  /**
   * Basic information about the race to display.
   */
  race: RaceInfo;

  /**
   * A callback function to open a race with the specified id when the
   * card is clicked.
   */
  onSelectRace?: (uid: string) => void;
}
