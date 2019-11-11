import { RaceStatus } from "../../../../types/race";

export interface RaceStatusProps {
  /**
   * The status of the current race.
   */
  status: RaceStatus;

  /**
   * Styling to apply to the root component.
   */
  className?: string;
}

export interface RaceStatusStyleProps {
  /**
   * Color to give the status background.
   */
  background: string;

  /**
   * Color to give the status label.
   */
  label: string;
}
