import { UserProfile } from "../../../../types/users";

export interface ParticipantListProps {
  /**
   * The id of the race to show the participants for.
   */
  raceId: string;

  /**
   * A list of registration ids for the race. This is used
   * to display which participants have registered.
   */
  registrationIds: string[];

  /**
   * A callback function for when a participant is selected.
   */
  onSelectParticipant: (participant: UserProfile) => void;
}
