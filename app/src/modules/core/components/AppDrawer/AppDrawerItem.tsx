import React from "react";
import { Link } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import { AppDrawerItemProps } from "./types";

/**
 * This component renders a app drawer which is shown in
 * the app drawer menu.
 */
export const AppDrawerItem: React.FC<AppDrawerItemProps> = ({
  onClose,
  Icon,
  iconColor,
  itemStyle,
  to,
  name
}) => {
  return (
    <ListItem button component={Link} to={to} onClick={onClose}>
      <ListItemIcon>
        <Icon color={iconColor} />
      </ListItemIcon>
      <ListItemText
        classes={{
          primary: itemStyle
        }}
      >
        {name}
      </ListItemText>
    </ListItem>
  );
};
