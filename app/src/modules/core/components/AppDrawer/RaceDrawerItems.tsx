import React, { FC, useContext, useCallback } from "react";

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import ExitIcon from "@material-ui/icons/ExitToApp";

import AppModeContext from "../../contexts/AppModeContext";

import { AppDrawerItemsProps } from "./types";

/**
 * Shows the items for the race mode drawer.
 */
export const RaceDrawerItems: FC<AppDrawerItemsProps> = ({ onClose }) => {
  const { setMode } = useContext(AppModeContext);

  const toDashboard = useCallback(() => {
    onClose();
    setMode("dashboard");
  }, [onClose, setMode]);

  return (
    <List>
      <Divider />
      <ListItem button onClick={toDashboard}>
        <ListItemIcon>
          <ExitIcon />
        </ListItemIcon>
        <ListItemText>Exit to dashboard</ListItemText>
      </ListItem>
    </List>
  );
};
