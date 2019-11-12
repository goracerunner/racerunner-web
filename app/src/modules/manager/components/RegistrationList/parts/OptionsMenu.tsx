import React, { FC } from "react";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { RegistrationOptionsMenuProps } from "../types";

/**
 * This component renders the options menu for a registration.
 */
export const OptionsMenu: FC<RegistrationOptionsMenuProps> = ({
  menuAnchor,
  closeMenu,
  setShowRawData
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
          setShowRawData(true);
          closeMenu();
        }}
      >
        View raw data
      </MenuItem>
    </Menu>
  );
};
