import React from "react";

import useStyles from "./styles";

/**
 * Fills the background of the screen with the
 * default static background image.
 */
export const Background: React.FC = () => {
  const classes = useStyles();
  return <div className={classes.root} />;
};
