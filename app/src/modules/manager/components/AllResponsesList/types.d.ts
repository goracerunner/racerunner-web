import { Race } from "../../../../types/race";

export interface AllResponsesListProps {
  /**
   * The type of responses to get.
   */
  type: "checked" | "unchecked";

  /**
   * The race to get responses for.
   */
  race: Race;
}
