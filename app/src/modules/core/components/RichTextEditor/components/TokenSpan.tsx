import React, { FC } from "react";

import { useTokenStyles } from "../styles";

/**
 * This component adds styling to a token that has
 * been decorated by `draft-js`.
 */
export const TokenSpan: FC = ({ children }) => {
  const classes = useTokenStyles();
  return <span className={classes.token}>{children}</span>;
};
