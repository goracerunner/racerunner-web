import { EmailType } from "./EmailType";

export interface EmailProps {
  /**
   * The type of email to display.
   * @default EmailType.CONTACT
   */
  type?: EmailType;

  /**
   * Show the email as plain text only. By default the
   * email is displayed as a `mailto` link.
   * @default false
   */
  textOnly?: boolean;
}
