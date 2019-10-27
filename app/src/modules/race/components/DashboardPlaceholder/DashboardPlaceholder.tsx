import React, { FC } from "react";

import Typography from "@material-ui/core/Typography";

import Container from "../../../base/components/Container";

import { DashboardPlaceholderProps } from "./types";
import useStyles from "./styles";

/**
 * This component is a placeholder for when a user completes their registration.
 */
export const DashboardPlaceholder: FC<DashboardPlaceholderProps> = ({
  race
}) => {
  const classes = useStyles();
  return (
    <Container>
      <Typography variant="body2" color="textSecondary">
        Welcome to
      </Typography>
      <Typography variant="h3" className={classes.title}>
        {race.name}
      </Typography>
      <Typography variant="body1" className={classes.info}>
        Your registration has been received.
      </Typography>
      <Typography variant="body2" color="textSecondary">
        This application is currently under development. More content will be
        available soon. Please come back later!
      </Typography>
    </Container>
  );
};