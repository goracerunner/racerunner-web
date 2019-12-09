import React, { FC } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

import { LoadingProps } from "./types";
import useStyles from "./styles";

/**
 * Show a loader.
 */
export const Loading: FC<LoadingProps> = props => {
  const classes = useStyles(props);
  const { size } = props;
  return (
    <div className={classes.centered}>
      <CircularProgress size={size} />
    </div>
  );
};
