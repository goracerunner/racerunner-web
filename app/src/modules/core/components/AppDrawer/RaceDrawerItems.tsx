import React, { FC } from "react";
import { Link } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import ExitIcon from "@material-ui/icons/ExitToApp";

import { AppDrawerItemsProps } from "./types";

/**
 * Shows the items for the race mode drawer.
 */
export const RaceDrawerItems: FC<AppDrawerItemsProps> = ({ onClose }) => {
  return (
    <List>
      <ListItem button component={Link} to="/dashboard" onClick={onClose}>
        <ListItemIcon>
          <ExitIcon />
        </ListItemIcon>
        <ListItemText>Exit to dashboard</ListItemText>
      </ListItem>
    </List>
  );
};
