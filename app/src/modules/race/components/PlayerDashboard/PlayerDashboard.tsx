import React, { FC, useContext } from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import NewIcon from "@material-ui/icons/Whatshot";
import PendingIcon from "@material-ui/icons/HourglassFull";
import CompletedIcon from "@material-ui/icons/CheckCircle";

import RaceContext from "../../../core/contexts/RaceContext";

import Loading from "../../../core/components/Loading";
import LinkList from "../../../core/components/LinkList";
import Property from "../../../core/components/Property";

import PageTitle from "../PageTitle";
import RaceNotInProgress from "../RaceNotInProgress";
import PlayerTeamProfile from "../PlayerTeamProfile";
import TeamMemberList from "../TeamMemberList";

import { Nullable } from "../../../../types/global";

import { PlayerDashboardProps } from "./types";
import useStyles from "./styles";

/**
 * The player dashboard shows a player's team's stats and links to view challenges.
 */
export const PlayerDashboard: FC<PlayerDashboardProps> = ({ race, user }) => {
  const classes = useStyles();
  const { loading, team } = useContext(RaceContext);

  if (race.status !== "in_progress") {
    return <RaceNotInProgress race={race} />;
  }

  let content: Nullable<JSX.Element> = null;

  if (loading) {
    content = <Loading />;
  } else if (!team) {
    content = (
      <>
        <Divider className={classes.divider} />
        <div className={classes.noTeam}>
          <Typography variant="h5" color="error">
            <b>NO TEAM</b>
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.divider}
          >
            You have not been assigned to a team. Please contact your game
            master for assistance.
          </Typography>
        </div>
        <Divider className={classes.divider} />
      </>
    );
  } else {
    content = (
      <>
        <Divider className={classes.divider} />
        <PlayerTeamProfile team={team} />
        <Divider className={classes.divider} />
        <Button
          fullWidth
          size="large"
          color="secondary"
          variant="contained"
          className={classes.submit}
        >
          <b>Submit code</b>
        </Button>
        <Divider className={classes.divider} />
        <LinkList
          fullWidth
          links={[
            {
              id: "new",
              name: "New challenges",
              description: "Challenges you have not completed yet",
              link: "/race/nodes/new",
              icon: <NewIcon />
            },
            {
              id: "pending",
              name: "Pending challenges",
              description: "Challenges awaiting feedback",
              link: "/race/nodes/pending",
              icon: <PendingIcon />
            },
            {
              id: "complete",
              name: "Completed challenges",
              description: "Challenges that have been scored",
              link: "/race/nodes/completed",
              icon: <CompletedIcon />
            }
          ]}
        />
        <Divider className={classes.divider} />
        <Property title="Team members">
          <TeamMemberList race={race} team={team} user={user} />
        </Property>
      </>
    );
  }

  return (
    <Container maxWidth="sm">
      <PageTitle
        title="Dashboard"
        subtitle={
          <>
            Event: <b>{race.name}</b>
          </>
        }
      />
      {content}
    </Container>
  );
};
