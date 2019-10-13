import React, { FC } from "react";
import { Link } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import { AppBarMenuProps } from "./types";
import { useAppBarMenuStyles } from "./styles";

export const AppBarMenu: FC<AppBarMenuProps> = ({
  user,
  openMenu,
  menuAnchor,
  closeMenu,
  logout
}) => {
  const classes = useAppBarMenuStyles();

  return (
    <>
      <IconButton onClick={openMenu} className={classes.avatarButton}>
        <Avatar src={user.photoURL || ""} className={classes.avatar} />
      </IconButton>
      <Menu
        anchorEl={menuAnchor}
        keepMounted
        open={Boolean(menuAnchor)}
        onClose={closeMenu}
      >
        <div className={classes.profile}>
          <Avatar src={user.photoURL || ""} className={classes.bigAvatar} />{" "}
          <div className={classes.profileInfo}>
            <Typography variant="body2" component="p">
              <b>{user.displayName}</b>
            </Typography>
            <Typography variant="caption" component="p">
              {user.email}
            </Typography>
          </div>
        </div>
        <Divider />
        <MenuItem onClick={closeMenu} component={Link} to="/account">
          Account
        </MenuItem>
        <MenuItem
          onClick={() => {
            closeMenu();
            if (logout) logout();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
