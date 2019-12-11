import React, { FC } from "react";

import Typography from "@material-ui/core/Typography";

import { PageTitleProps } from "./types";
import useStyles from "./styles";

/**
 * Render a page title.
 */
export const PageTitle: FC<PageTitleProps> = ({ title, subtitle }) => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h3" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {subtitle}
      </Typography>
    </>
  );
};
