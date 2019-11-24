import { RaceRegistrationFieldValidation } from "../../../../types/race";

export interface RegistrationFieldEditorProps {
  /**
   * The Id of the race to edit fields for.
   */
  raceId: string;
}

export interface ValidationDisplayProps {
  /**
   * The field validation to show details for.
   */
  validation: RaceRegistrationFieldValidation;
}
