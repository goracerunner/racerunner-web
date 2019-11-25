import { Team } from "../../../../types/team";

export interface TeamListProps {
  /**
   * The id of the race to show teams for.
   */
  raceId: string;

  /**
   * A callback function for when the add team button is clicked.
   */
  onAddTeam: () => void;
}
