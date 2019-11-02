import React, { FC } from "react";
import { Link } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import AdminIcon from "@material-ui/icons/Lock";

import { usePathMatch } from "../../../hooks/useNavigation";

import Authorised from "../../Authorised";

import { AppDrawerItemsProps } from "../types";
import { useDrawerItemStyles } from "../styles";

/**
 * Shows the items for the dashboard mode drawer.
 */
export const DashboardDrawerItems: FC<AppDrawerItemsProps> = ({ onClose }) => {
  const classes = useDrawerItemStyles();

  const labelStyle = usePathMatch("", classes.selected, undefined);
  const iconColor = usePathMatch<"inherit" | "disabled">(
    "",
    "inherit",
    "disabled"
  );

  return (
    <List>
      <Authorised claims={["admin"]}>
        <ListItem button component={Link} to="/admin" onClick={onClose}>
          <ListItemIcon>
            <AdminIcon color={iconColor("admin")} />
          </ListItemIcon>
          <ListItemText
            primary="Admin dashboard"
            classes={{
              primary: labelStyle("admin")
            }}
          />
        </ListItem>
      </Authorised>
    </List>
  );
};
