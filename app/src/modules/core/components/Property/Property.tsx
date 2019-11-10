import React, { FC } from "react";

import Typography from "@material-ui/core/Typography";

import { PropertyProps } from "./types";
import useStyles from "./styles";

/**
 * This component renders a title above the content (children).
 */
export const Property: FC<PropertyProps> = ({ title, children }) => {
  const classes = useStyles();
  return (
    <div className={classes.property}>
      <Typography variant="button" color="textSecondary">
        {title}
      </Typography>
      {typeof children === "string" ? (
        <Typography variant="body1">{children}</Typography>
      ) : (
        children
      )}
    </div>
  );
};
