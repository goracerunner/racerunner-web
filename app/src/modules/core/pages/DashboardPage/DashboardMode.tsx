import React, { FC, useContext, useState, useEffect } from "react";

import Typography from "@material-ui/core/Typography";

import { useBooleanState } from "../../../base/hooks/useStateFactory";
import Header from "../../../base/components/Header";
import Container from "../../../base/components/Container";
import RaceList from "../../../dashboard/components/RaceList";
import JoinRaceDialog from "../../../dashboard/components/JoinRaceDialog";

import AuthenticationContext from "../../contexts/AuthenticationContext";
import Authorised from "../../components/Authorised";

import { useDashboardStyles } from "./styles";

/**
 * The `dashboard` mode dashboard shows links to
 * register in races and to view races that the user
 * has registered in.
 */
export const DashboardMode: FC = () => {
  const classes = useDashboardStyles();
  const { user } = useContext(AuthenticationContext);
  const [
    joinRaceOpen,
    openJoinRaceDialog,
    closeJoinRaceDialog
  ] = useBooleanState(false);

  return (
    <>
      <div className={classes.title}>
        <Typography variant="h6" color="textSecondary">
          <b>Welcome to</b>
        </Typography>
        <Header reduced className={classes.header} />
      </div>
      <Container>
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
