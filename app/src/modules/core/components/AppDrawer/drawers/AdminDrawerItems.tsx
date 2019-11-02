import React, { FC } from "react";
import { Link } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";

import DashboardIcon from "@material-ui/icons/Lock";
import UsersIcon from "@material-ui/icons/Group";
import RacesIcon from "@material-ui/icons/Flag";
import ExitIcon from "@material-ui/icons/ExitToApp";

import { usePathMatch } from "../../../hooks/useNavigation";

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
      <ListItem button component={Link} to="/admin" onClick={onClose}>
        <ListItemIcon>
          <DashboardIcon color={iconColor()} />
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: itemStyle()
          }}
        >
          Admin Dashboard
        </ListItemText>
      </ListItem>
      <ListItem button component={Link} to="/admin/users" onClick={onClose}>
        <ListItemIcon>
          <UsersIcon color={iconColor("users")} />
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: itemStyle("users")
          }}
        >
          Users
        </ListItemText>
      </ListItem>
      <ListItem button component={Link} to="/admin/races" onClick={onClose}>
        <ListItemIcon>
          <RacesIcon color={iconColor("races")} />
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: itemStyle("races")
          }}
        >
          Races
        </ListItemText>
      </ListItem>
      <Divider />
      <ListItem button component={Link} to="/dashboard" onClick={onClose}>
        <ListItemIcon>
          <ExitIcon color="disabled" />
        </ListItemIcon>
        <ListItemText>Exit to dashboard</ListItemText>
      </ListItem>
    </List>
  );
};
