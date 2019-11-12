import React, { FC } from "react";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";

import { UserOptionsMenuProps } from "../types";

/**
 * This component renders the options menu for a user.
 */
export const OptionsMenu: FC<UserOptionsMenuProps> = ({
  menuAnchor,
  closeMenu,
  openProfile,
  openRoles,
  openDelete
}) => {
  return (
    <Menu
      keepMounted
      anchorEl={menuAnchor}
      open={Boolean(menuAnchor)}
      onClose={closeMenu}
    >
      <MenuItem
        onClick={() => {
          closeMenu();
          openProfile();
        }}
      >
        View profile
      </MenuItem>
      <MenuItem
        onClick={() => {
          closeMenu();
          openRoles();
        }}
      >
        Edit roles
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={() => {
          closeMenu();
          openDelete();
        }}
      >
        Delete user
      </MenuItem>
    </Menu>
  );
};
