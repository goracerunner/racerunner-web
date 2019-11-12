import React, { FC } from "react";

import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import ErrorIcon from "@material-ui/icons/Warning";

import { ErrorProps } from "./types";
import useStyles from "./styles";

/**
 * Show an error message with an icon.
 */
export const Error: FC<ErrorProps> = props => {
  const classes = useStyles(props);
  const { Icon = ErrorIcon, error, caption } = props;

  if (!error) return null;

  return (
    <div className={classes.centered}>
      <Icon color="error" className={classes.icon} />
      <Tooltip title={error.toString()}>
        <Typography variant="body1" color="textSecondary">
          {caption}
        </Typography>
      </Tooltip>
    </div>
  );
};
