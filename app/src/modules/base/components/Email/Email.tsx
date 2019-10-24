import React from "react";

import { EmailProps } from "./types";
import { EmailType } from "./EmailType";
import clsx from "clsx";

/**
 * Renders one of the known email addresses.
 */
export const Email: React.FC<EmailProps> = ({ textOnly, type, dark }) => {
  if (textOnly) return <span>{type}</span>;
  return (
    <a
      className={clsx("link", {
        dark
      })}
      href={`mailto:${type}`}
    >
      {type}
    </a>
  );
};

Email.defaultProps = {
  type: EmailType.CONTACT,
  textOnly: false
};
