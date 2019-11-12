import React, { FC } from "react";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import DashboardIcon from "@material-ui/icons/Dashboard";
import RegistrationIcon from "@material-ui/icons/AssignmentInd";
import ManagerIcon from "@material-ui/icons/PermIdentity";
import NodesIcon from "@material-ui/icons/Flag";
import TeamsIcon from "@material-ui/icons/People";
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
        name="Manager Home"
        Icon={DashboardIcon}
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
        to="/manage/managers"
        onClose={onClose}
        iconColor={iconColor("managers")}
        itemStyle={itemStyle("managers")}
        name="Managers"
        Icon={ManagerIcon}
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
        name="Exit to dashboard"
        Icon={ExitIcon}
      />
    </List>
  );
};
