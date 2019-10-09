import React from "react";

import { EmailProps } from "./types";
import { EmailType } from "./EmailType";

/**
 * Renders one of the known email addresses.
 */
export const Email: React.FC<EmailProps> = props => {
  if (props.textOnly) return <span>{props.type}</span>;
  return (
    <a className="dark link" href={`mailto:${props.type}`}>
      {props.type}
    </a>
  );
};

Email.defaultProps = {
  type: EmailType.CONTACT,
  textOnly: false
};
