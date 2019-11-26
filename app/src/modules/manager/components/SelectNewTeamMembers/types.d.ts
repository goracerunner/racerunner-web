export interface SelectNewTeamMembersProps {
  /**
   * The id of the race.
   */
  raceId: string;

  /**
   * A mapping of user ids to user profiles. If the value of the
   * key-value pair is not `null`, then the user is selected.
   */
  members: {
    [key: string]: Nullable<UserProfile>;
  };

  /**
   * Set a member as selected. Pass `null` to mark the user as deselected.
   */
  setMember: (key: string, value: Nullable<UserProfile>) => void;
}
