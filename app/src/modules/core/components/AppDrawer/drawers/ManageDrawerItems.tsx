import React, { FC } from "react";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import DashboardIcon from "@material-ui/icons/Dashboard";
import ManagerIcon from "@material-ui/icons/PermIdentity";
import ParticipantsIcon from "@material-ui/icons/AccountCircle";
import RegistrationIcon from "@material-ui/icons/AssignmentInd";
import TeamsIcon from "@material-ui/icons/People";
import NodesIcon from "@material-ui/icons/Flag";
import ResponsesIcon from "@material-ui/icons/QuestionAnswer";
import ScoreboardIcon from "@material-ui/icons/Assessment";
import SettingsIcon from "@material-ui/icons/SettingsApplications";
import ExitIcon from "@material-ui/icons/ExitToApp";

import { usePathMatch } from "../../../hooks/useNavigation";

import { AppDrawerItem } from "../AppDrawerItem";
import { useDrawerItemStyles } from "../styles";
import { AppDrawerItemsProps } from "../types";

/**
 * Shows the items for the manage mode drawer.
 */
export const ManageDrawerItems: FC<AppDrawerItemsProps> = ({ onClose }) => {
  const classes = useDrawerItemStyles();

  const itemStyle = usePathMatch("manage", classes.selected, undefined);
  const iconColor = usePathMatch<"inherit" | "disabled">(
    "manage",
    "inherit",
    "disabled"
  );

  return (
    <List>
      <AppDrawerItem
        to="/manage"
        onClose={onClose}
        iconColor={iconColor()}
        itemStyle={itemStyle()}
        name="Dashboard"
        Icon={DashboardIcon}
      />
      <AppDrawerItem
        to="/manage/managers"
        onClose={onClose}
        iconColor={iconColor("managers")}
        itemStyle={itemStyle("managers")}
        name="Managers"
        Icon={ManagerIcon}
      />
      <AppDrawerItem
        to="/manage/participants"
        onClose={onClose}
        iconColor={iconColor("participants")}
        itemStyle={itemStyle("participants")}
        name="Participants"
        Icon={ParticipantsIcon}
      />
      <AppDrawerItem
        to="/manage/registrations"
        onClose={onClose}
        iconColor={iconColor("registrations")}
        itemStyle={itemStyle("registrations")}
        name="Registrations"
        Icon={RegistrationIcon}
      />
      <AppDrawerItem
        to="/manage/teams"
        onClose={onClose}
        iconColor={iconColor("teams")}
        itemStyle={itemStyle("teams")}
        name="Teams"
        Icon={TeamsIcon}
      />
      <AppDrawerItem
        to="/manage/nodes"
        onClose={onClose}
        iconColor={iconColor("nodes")}
        itemStyle={itemStyle("nodes")}
        name="Nodes"
        Icon={NodesIcon}
      />
      <AppDrawerItem
        to="/manage/responses"
        onClose={onClose}
        iconColor={iconColor("responses")}
        itemStyle={itemStyle("responses")}
        name="Responses"
        Icon={ResponsesIcon}
      />
      <AppDrawerItem
        to="/manage/scoreboard"
        onClose={onClose}
        iconColor={iconColor("scoreboard")}
        itemStyle={itemStyle("scoreboard")}
        name="Scoreboard"
        Icon={ScoreboardIcon}
      />
      <AppDrawerItem
        to="/manage/settings"
        onClose={onClose}
        iconColor={iconColor("settings")}
        itemStyle={itemStyle("settings")}
        name="Settings"
        Icon={SettingsIcon}
      />
      <Divider />
      <AppDrawerItem
        to="/dashboard"
        onClose={onClose}
        name="Exit manager mode"
        Icon={ExitIcon}
      />
    </List>
  );
};
