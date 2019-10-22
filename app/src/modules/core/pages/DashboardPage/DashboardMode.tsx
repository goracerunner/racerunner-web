import React, { FC, useContext } from "react";

import Typography from "@material-ui/core/Typography";

import AuthenticationContext from "../../contexts/AuthenticationContext";
import Authorised from "../../components/Authorised";
import Header from "../../../base/components/Header";
import Container from "../../../base/components/Container";
import RaceList from "../../../dashboard/components/RaceList";

import { useDashboardStyles } from "./styles";

/**
 * The `dashboard` mode dashboard shows links to
 * register in races and to view races that the user
 * has registered in.
 */
export const DashboardMode: FC = () => {
  const classes = useDashboardStyles();
  const { user } = useContext(AuthenticationContext);

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
        {user && <RaceList user={user} showJoinRace />}
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
