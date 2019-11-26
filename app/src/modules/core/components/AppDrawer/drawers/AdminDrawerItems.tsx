import React, { FC } from "react";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import DashboardIcon from "@material-ui/icons/Dashboard";
import UsersIcon from "@material-ui/icons/Group";
import RacesIcon from "@material-ui/icons/Flag";
import ExitIcon from "@material-ui/icons/ExitToApp";

import { usePathMatch } from "../../../hooks/useNavigation";

import { AppDrawerItem } from "../AppDrawerItem";
import { useDrawerItemStyles } from "../styles";
import { AppDrawerItemsProps } from "../types";

/**
 * Shows the items for the admin mode drawer.
 */
export const AdminDrawerItems: FC<AppDrawerItemsProps> = ({ onClose }) => {
  const classes = useDrawerItemStyles();

  const itemStyle = usePathMatch("admin", classes.selected, undefined);
  const iconColor = usePathMatch<"inherit" | "disabled">(
    "admin",
    "inherit",
    "disabled"
  );

  return (
    <List>
      <AppDrawerItem
        to="/admin"
        onClose={onClose}
        iconColor={iconColor()}
        itemStyle={itemStyle()}
        name="Dashboard"
        Icon={DashboardIcon}
      />
      <AppDrawerItem
        to="/admin/users"
        onClose={onClose}
        iconColor={iconColor("users")}
        itemStyle={itemStyle("users")}
        name="Users"
        Icon={UsersIcon}
      />
      <AppDrawerItem
        to="/admin/races"
        onClose={onClose}
        iconColor={iconColor("races")}
        itemStyle={itemStyle("races")}
        name="Races"
        Icon={RacesIcon}
      />
      <Divider />
      <AppDrawerItem
        to="/dashboard"
        onClose={onClose}
        name="Exit administration"
        Icon={ExitIcon}
      />
    </List>
  );
};
