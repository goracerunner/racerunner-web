import React from "react";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";

import UsersIcon from "@material-ui/icons/Group";
import RaceIcon from "@material-ui/icons/Flag";

import { DataProvider } from "../../../core/contexts/DataContext";
import { useStat } from "../../../core/hooks/useData";

import StoryList, { StoryCard } from "../../../core/components/StoryList";
import LinkList from "../../../core/components/LinkList";
import StatDisplay from "../../../core/components/StatDisplay";

import { Stat } from "../../../../types/stats";

import useStyles from "./styles";

/**
 * The admin dashboard shows important links and statistics for the administrator.
 */
export const AdminDashboardPage: React.FC = () => {
  const classes = useStyles();

  // Get statistics
  const usersStat = useStat("users");
  const adminsStat = useStat("admins");
  const managersStat = useStat("managers");
  const racesStat = useStat("races");

  return (
    <Container maxWidth="md">
      <Typography variant="h4" className={classes.title}>
        <b>Admin Dashboard</b>
      </Typography>
      <LinkList
        links={[
          {
            id: "users",
            name: "Users",
            largeTitle: true,
            link: "/admin/users",
            description: "Manage users",
            icon: <UsersIcon fontSize="large" />
          },
          {
            id: "races",
            name: "Races",
            largeTitle: true,
            link: "/admin/races",
            description: "Manage races",
            icon: <RaceIcon fontSize="large" />
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
          title="Users"
          subtitle="Users in the system"
          appIcon={<UsersIcon />}
          appTooltip="View users"
          appLink="/admin/users"
        >
          <DataProvider<Stat<number>> {...usersStat}>
            <StatDisplay caption="users" singularCaption="user" nullable />
          </DataProvider>
        </StoryCard>
        <StoryCard
          small
          title="Administrators"
          subtitle="Administrators in the system"
        >
          <DataProvider<Stat<number>> {...adminsStat}>
            <StatDisplay
              caption="adminstrators"
              singularCaption="adminstrator"
              nullable
            />
          </DataProvider>
        </StoryCard>
        <StoryCard small title="Managers" subtitle="Managers in the system">
          <DataProvider<Stat<number>> {...managersStat}>
            <StatDisplay
              caption="managers"
              singularCaption="manager"
              nullable
            />
          </DataProvider>
        </StoryCard>
        <StoryCard
          small
          title="Races"
          subtitle="Number of races created"
          appIcon={<RaceIcon />}
          appTooltip="View races"
          appLink="/admin/races"
        >
          <DataProvider<Stat<number>> {...racesStat}>
            <StatDisplay caption="races" singularCaption="race" nullable />
          </DataProvider>
        </StoryCard>
      </StoryList>
    </Container>
  );
};
