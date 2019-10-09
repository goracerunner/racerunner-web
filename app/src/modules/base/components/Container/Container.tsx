import React from "react";
import clsx from "clsx";

import { ContainerProps } from "./types";
import useStyles from "./styles";

/**
 * A container restricts content within a viewport of a specific width.
 */
export const Container: React.FC<ContainerProps> = props => {
  const classes = useStyles(props);
  const { children, className } = props;
  return <div className={clsx(classes.root, className)}>{children}</div>;
};

Container.defaultProps = {
  fullWidth: false,
  margins: "1rem"
};
