import { Race } from "../../../../types/race";

export interface RegistrationFormProps {
  /**
   * The race to show the registration form for.
   */
  race: Race;

  /**
   * Callback function for when the registration is processed.
   */
  onRegister: (key: string, registration: object) => void;
}
