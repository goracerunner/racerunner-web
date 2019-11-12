import React, { FC } from "react";
import clsx from "clsx";

import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";

import CancelIcon from "@material-ui/icons/Close";

import { useFilterStyles } from "../styles";
import { UsersFilterMenuProps } from "../types";

/**
 * This component renders the filtering menu for a user list.
 */
export const FilterMenu: FC<UsersFilterMenuProps> = ({
  menuAnchor,
  closeMenu,
  filter,
  userSearch,
  setFilter,
  setUserSearch
}) => {
  const classes = useFilterStyles();
  return (
    <Menu
      keepMounted
      anchorEl={menuAnchor}
      open={Boolean(menuAnchor)}
      onClose={closeMenu}
      transformOrigin={{
        horizontal: "right",
        vertical: "top"
      }}
    >
      <ListItem>
        <TextField
          onChange={e => setUserSearch(e.target.value)}
          label="Search users"
          placeholder="Type a name..."
          value={userSearch}
        />
        {userSearch && (
          <IconButton
            size="small"
            className={classes.cancel}
            onClick={() => setUserSearch("")}
          >
            <CancelIcon />
          </IconButton>
        )}
      </ListItem>
      <Divider />
      <div>
        <MenuItem onClick={() => setFilter("all")}>
          <Typography
            className={clsx({
              [classes.selected]: filter === "all"
            })}
          >
            Show all users
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => setFilter("admin")}>
          <Typography
            className={clsx({
              [classes.selected]: filter === "admin"
            })}
          >
            Show admins only
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => setFilter("manager")}>
          <Typography
            className={clsx({
              [classes.selected]: filter === "manager"
            })}
          >
            Show managers only
          </Typography>
        </MenuItem>
      </div>
    </Menu>
  );
};
