import React, { FC } from "react";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import DashboardIcon from "@material-ui/icons/Dashboard";
import NodesIcon from "@material-ui/icons/Flag";
import ExitIcon from "@material-ui/icons/ExitToApp";

import { usePathMatch } from "../../../hooks/useNavigation";

import { AppDrawerItem } from "../AppDrawerItem";
import { AppDrawerItemsProps } from "../types";
import { useDrawerItemStyles } from "../styles";

/**
 * Shows the items for the race mode drawer.
 */
export const RaceDrawerItems: FC<AppDrawerItemsProps> = ({ onClose }) => {
  const classes = useDrawerItemStyles();

  const itemStyle = usePathMatch("race", classes.selected, undefined);
  const iconColor = usePathMatch<"inherit" | "disabled">(
    "race",
    "inherit",
    "disabled"
  );

  return (
    <List>
      <AppDrawerItem
        to="/race"
        onClose={onClose}
        iconColor={iconColor()}
        itemStyle={itemStyle()}
        name="Overview"
        Icon={DashboardIcon}
      />
      <AppDrawerItem
        to="/race/nodes"
        onClose={onClose}
        iconColor={iconColor("nodes")}
        itemStyle={itemStyle("nodes")}
        name="Challenges"
        Icon={NodesIcon}
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
