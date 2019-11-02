import React, { FC, useContext } from "react";
import Helmet from "react-helmet";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import AuthenticationContext from "../../../core/contexts/AuthenticationContext";
import { useBooleanState } from "../../../base/hooks/useStateFactory";

import Authorised from "../../../core/components/Authorised";
import Header from "../../../base/components/Header";
import RaceList from "../../components/RaceList";
import JoinRaceDialog from "../../components/JoinRaceDialog";

import useStyles from "./styles";

/**
 * The `dashboard` mode dashboard shows links to
 * register in races and to view races that the user
 * has registered in.
 */
export const DashboardPage: FC = () => {
  const classes = useStyles();

  const { user } = useContext(AuthenticationContext);

  const [
    joinRaceOpen,
    openJoinRaceDialog,
    closeJoinRaceDialog
  ] = useBooleanState(false);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className={classes.title}>
        <Typography variant="h6" color="textSecondary">
          <b>Welcome to</b>
        </Typography>
        <Header reduced className={classes.header} />
      </div>
      <Container maxWidth="md">
        <Typography variant="h3" className={classes.subtitle}>
          Races you're in
        </Typography>
        {user && (
          <RaceList user={user} showJoinRace onJoinRace={openJoinRaceDialog} />
        )}
        <JoinRaceDialog open={joinRaceOpen} onClose={closeJoinRaceDialog} />
        <Authorised claims={["manager"]}>
          <Typography variant="h3" className={classes.subtitle}>
            Races you're managing
          </Typography>
          {user && <RaceList user={user} viewManaging />}
        </Authorised>
      </Container>
    </>
  );
};
