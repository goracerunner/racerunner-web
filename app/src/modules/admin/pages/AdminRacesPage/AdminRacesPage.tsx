import React from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import WarningIcon from "@material-ui/icons/Warning";

import useStyles from "./styles";

/**
 * TODO: add description
 */
export const AdminRacesPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Typography variant="h4" className={classes.title}>
        <b>Races</b>
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        className={classes.info}
      >
        This list shows all the races in the system.
      </Typography>
      <br />
      <Typography variant="body1" color="error" className={classes.na}>
        <WarningIcon className={classes.icon} />
        This feature is not available yet.
      </Typography>
    </Container>
  );
};
