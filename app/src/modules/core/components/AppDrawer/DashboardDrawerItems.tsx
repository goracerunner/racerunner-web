import React, { FC } from "react";
import { Link } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import AdminIcon from "@material-ui/icons/Https";

import { AppDrawerItemsProps } from "./types";
import Authorised from "../Authorised";

/**
 * Shows the items for the dashboard mode drawer.
 */
export const DashboardDrawerItems: FC<AppDrawerItemsProps> = ({ onClose }) => {
  return (
    <List>
      <Authorised claims={["admin"]}>
        <ListItem button component={Link} to="/admin" onClick={onClose}>
          <ListItemIcon>
            <AdminIcon />
          </ListItemIcon>
          <ListItemText primary="Admin dashboard" />
        </ListItem>
      </Authorised>
    </List>
  );
};
