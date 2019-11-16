import React, { useContext } from "react";
import { Redirect } from "react-router";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";

import RegistrationIcon from "@material-ui/icons/AssignmentInd";
import ManagerIcon from "@material-ui/icons/PermIdentity";
import RaceIcon from "@material-ui/icons/Flag";
import SettingsIcon from "@material-ui/icons/SettingsApplications";
import TeamsIcon from "@material-ui/icons/People";
import UserIcon from "@material-ui/icons/AccountCircle";

import RaceContext from "../../../core/contexts/RaceContext";
import { DataProvider } from "../../../core/contexts/DataContext";

import Loader from "../../../base/components/Loader";

import StoryList, { StoryCard } from "../../../core/components/StoryList";
import StatDisplay from "../../../core/components/StatDisplay";
import LinkList from "../../../core/components/LinkList";

import RaceStatus from "../../components/RaceStatus";

import { Stat } from "../../../../types/stats";

import useStyles from "./styles";

/**
 * TODO: add description
 */
export const ManagerDashboardPage: React.FC = () => {
  const classes = useStyles();

  const { loading, race } = useContext(RaceContext);

  if (loading) {
    return <Loader message="Loading race..." />;
  }

  if (!race) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container maxWidth="md">
      <div className={classes.title}>
        <Typography variant="h4">
          <b>{race.name}</b>
          <RaceStatus status={race.status} className={classes.status} />
        </Typography>
        <Typography
          className={classes.subtitle}
          variant="subtitle2"
          color="textSecondary"
        >
          {race.description}
        </Typography>
      </div>
      <LinkList
        links={[
          {
            id: "managers",
            name: "Managers",
            link: "/manage/managers",
            icon: <ManagerIcon />
          },
          {
            id: "participants",
            name: "Participants",
            link: "/manage/participants",
            icon: <UserIcon />
          },
          {
            id: "teams",
            name: "Teams",
            link: "/manage/teams",
            icon: <TeamsIcon />
          },
          {
            id: "nodes",
            name: "Nodes",
            link: "/manage/nodes",
            icon: <RaceIcon />
          },
          {
            id: "registrations",
            name: "Registrations",
            link: "/manage/registrations",
            icon: <RegistrationIcon />
          },
          {
            id: "settings",
            name: "Settings",
            link: "/manage/settings",
            icon: <SettingsIcon />
          }
        ]}
      />
      <Divider className={classes.title} />
      <Typography variant="h6" className={classes.smallTitle}>
        <b>Statistics</b>
      </Typography>
      <StoryList>
        <StoryCard
          small
          title="Registrations"
          subtitle="Users who have registered"
          appIcon={<RegistrationIcon />}
          appTooltip="View registrations"
          appLink="/manage/registrations"
        >
          <DataProvider<Stat<number>>
            data={{
              value: race.registrationIds.length
            }}
          >
            <StatDisplay
              caption="registrations"
              singularCaption="registration"
            />
          </DataProvider>
        </StoryCard>
        <StoryCard
          small
          title="Managers"
          subtitle="Users who are managing the race"
          appIcon={<ManagerIcon />}
          appTooltip="View managers"
          appLink="/manage/managers"
        >
          <DataProvider<Stat<number>>
            data={{
              value: race.managerIds.length
            }}
          >
            <StatDisplay caption="managers" singularCaption="manager" />
          </DataProvider>
        </StoryCard>
        <StoryCard
          small
          title="Participants"
          subtitle="Users who have joined the race"
          appIcon={<UserIcon />}
          appTooltip="View participants"
          appLink="/manage/participants"
        >
          <DataProvider<Stat<number>>
            data={{
              value: race.participantIds.length
            }}
          >
            <StatDisplay caption="participants" singularCaption="participant" />
          </DataProvider>
        </StoryCard>
        <StoryCard small title="Teams" subtitle="Teams in the race">
          <StatDisplay caption="teams" singularCaption="team" nullable />
        </StoryCard>
        <StoryCard small title="Nodes" subtitle="Nodes in the race">
          <StatDisplay caption="nodes" singularCaption="node" nullable />
        </StoryCard>
        <StoryCard small title="Responses" subtitle="Responses given">
          <StatDisplay
            caption="responses"
            singularCaption="response"
            nullable
          />
        </StoryCard>
      </StoryList>
    </Container>
  );
};
