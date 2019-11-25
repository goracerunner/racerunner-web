import { UserProfile } from "../../../../types/users";

export interface ManagerListProps {
  /**
   * The id of the race to show the managers for.
   */
  raceId: string;

  /**
   * A callback function for when a manager is selected.
   */
  onSelectManager: (user: UserProfile) => void;

  /**
   * A callback function for when the add manager button is clicked.
   */
  onAddManager: () => void;
}
