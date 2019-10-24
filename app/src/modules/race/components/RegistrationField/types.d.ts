import { RaceRegistrationField } from "../../../../types/race";

export interface RegistrationFieldProps {
  /**
   * Field configuration.
   */
  field: RaceRegistrationField;
  /**
   * Set the value stored in the field.
   */
  setValue: (value: any) => void;
  /**
   * The value in the field.
   */
  value: any;
  /**
   * If `true`, the field will not be able to be modified.
   */
  disabled?: boolean;
  /**
   * Show an error for the field.
   */
  error?: string;
}
