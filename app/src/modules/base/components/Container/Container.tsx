import React from "react";

import { ContainerProps } from "./types";
import useStyles from "./styles";

/**
 * A container restricts content within a viewport of a specific width.
 */
export const Container: React.FC<ContainerProps> = props => {
  const classes = useStyles(props);
  return <div className={classes.root}>{props.children}</div>;
};

Container.defaultProps = {
  fullWidth: false,
  margins: "1rem"
};
