import React, { useContext } from "react";
import { Redirect } from "react-router";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import RaceContext from "../../../core/contexts/RaceContext";

import Loader from "../../../base/components/Loader";
import RegistrationList from "../../components/RegistrationList";

import useStyles from "./styles";

/**
 * This page shows the list of registrations for a race.
 */
export const ManagerRegistrationsPage: React.FC = () => {
  const classes = useStyles();
  const { loading, race } = useContext(RaceContext);

  if (loading) {
    return <Loader message="Loading race..." />;
  }

  if (!race) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container maxWidth="xl">
      <div className={classes.title}>
        <Typography variant="h4">
          <b>Registrations</b>
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          for {race.name}
        </Typography>
      </div>
      <RegistrationList raceId={race.uid} />
    </Container>
  );
};
